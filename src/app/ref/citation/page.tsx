"use client";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown, Clipboard } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {
  const [isOpen, setIsOpen] = useState(true);
  const [data, setData] = useState<string[]>([]);

  const formatData = (): string[] => {
    let data = [];
    try {
      data = JSON.parse(localStorage.getItem("data") || "");
      console.log(data);
    } catch (error) {
      data = [];
      // console.log(error);
    }
    return data;
  };
  const handleDisplay = (data: string[], type: "title" | "content") => {
    switch (type) {
      case "title":
        return (
          <div className="rounded-md border px-4 py-3 font-mono text-sm flex justify-between items-center">
            <p>{data[0]}</p>
            <Button
              variant="ghost"
              size="sm"
              className="w-9 p-0"
              onClick={() => {
                navigator.clipboard.writeText(data[0]);
              }}
            >
              <Clipboard className="h-4 w-4" />
              <span className="sr-only">Copy</span>
            </Button>
          </div>
        );
      case "content":
        return data.map((item, index) => {
          return (
            <div
              key={index}
              className="rounded-md border px-4 py-3 font-mono text-sm"
            >
              {item}
            </div>
          );
        });
      default:
        return data.map((item, index) => {
          return (
            <div
              key={index}
              className="rounded-md border px-4 py-3 font-mono text-sm"
            >
              {item}
            </div>
          );
        });
    }
  };

  useEffect(() => {
    setData(formatData());
  }, []);

  return (
    <div className="container mx-auto py-10">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full space-y-2"
      >
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-2xl font-semibold">Reference Format Output</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        {handleDisplay(formatData(), "title")}

        <CollapsibleContent className="space-y-2">
          {handleDisplay(formatData(), "content")}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
