import { RefBreadcrumb } from "@/components/ref-breadcrumb";
import { DataTable } from "./data-table";
import { cookies } from "next/headers";

async function getData(): Promise<RefType[]> {
  let cookieStore = cookies();
  const response = cookieStore.get("response")?.value;
  try {
    const data = JSON.parse(response || "{}").Bibtex || [];
    const transformedData = data.map((item: string, index: number) => ({
      id: (index + 1).toString(),
      bibtex: item,
    }));
    return transformedData;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return [];
  }
}

export default async function Page() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <RefBreadcrumb value={"display"} />
      <DataTable data={data} />
    </div>
  );
}
