import { DataTable } from "./data-table";

async function getData(): Promise<RefType[]> {
  // Fetch data from your API here.
  return [
    {
      id: "m5gr84i9",
      bibtex:
        "@article{Bai2022MillionjsAF,title={Million.js: A Fast Compiler-Augmented Virtual DOM for the Web},author={Aiden Bai},journal={Proceedings of the 38th ACM/SIGAPP Symposium on Applied Computing},year={2022},url={https://api.semanticscholar.org/CorpusID:253107164%7D}}",
    },
  ];
}

export default async function Page() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      {/* <TextareaForm /> */}
      <DataTable data={data} />
    </div>
  );
}
