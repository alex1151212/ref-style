"use client";
import React, { useEffect,useState } from 'react';
import { RefBreadcrumb } from "@/components/ref-breadcrumb";
import { DataTable } from "./data-table";

export default function Page() {
  const [data, setData] = useState<RefType[]>([]);
  useEffect(() => {
    let response;
    response = localStorage.getItem("response") || "";
    try {
      const data = JSON.parse(response || "{}").Bibtex || [];
      const transformedData = data.map((item: string, index: number) => ({
        id: (index + 1).toString(),
        bibtex: item,
      }));
      setData(transformedData);
      console.log("Data:", transformedData);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      setData([]);
    }
  }, []);
  
  return (
    <div className="container mx-auto py-10">
      <RefBreadcrumb value={"display"} />
      <DataTable data={data} />
    </div>
  );
}
