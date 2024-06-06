"use client";

import { RefBreadcrumb } from "@/components/ref-breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { toast } from "@/components/ui/use-toast";
import { ChevronsUpDown, Clipboard } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [data, setData] = useState<string[]>([]);

  const formatData = (): string[] => {
    let data = [];
    try {
      if (typeof window !== "undefined") {
        data = JSON.parse(localStorage.getItem("data") || "[]");
      }
    } catch (error) {
      data = [];
    }
    return data;
  };

  const handleCopy = (text: string) => {
    if (typeof window !== "undefined") {
      try {
        navigator.clipboard.writeText(text);
        toast({
          variant: "success",
          title: "Copy Success",
          description: "The text has been copied to your clipboard.",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Copy Error",
          description: "Failed to copy the text to your clipboard.",
        });
      }
    }
  };

  const handleDisplay = (data: string[], type: "title" | "content") => {
    switch (type) {
      case "title":
        return (
          <div className="rounded-md border px-4 py-3 font-mono text-sm flex justify-between items-center">
            <div
              className="flex-1"
              dangerouslySetInnerHTML={{ __html: data[0] }}
            />
            <Button
              variant="ghost"
              size="sm"
              className="w-9 p-0"
              onClick={() => {
                handleCopy(data[0]);
              }}
            >
              <Clipboard className="h-4 w-4" />
              <span className="sr-only">Copy</span>
            </Button>
          </div>
        );
      case "content":
        return data
          .filter((_, index) => index != 0)
          .map((item, index) => {
            return (
              <div
                key={index}
                className="rounded-md border px-4 py-3 font-mono text-sm flex justify-between items-center"
              >
                <div
                  className="flex-1"
                  dangerouslySetInnerHTML={{ __html: item }}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-9 p-0"
                  onClick={() => {
                    handleCopy(data[index]);
                  }}
                >
                  <Clipboard className="h-4 w-4" />
                  <span className="sr-only">Copy</span>
                </Button>
              </div>
            );
          });
      default:
        return data
          .filter((_, index) => index != 0)
          .map((item, index) => {
            return (
              <div
                key={index}
                className="rounded-md border px-4 py-3 font-mono text-sm flex justify-between items-center"
              >
                <div dangerouslySetInnerHTML={{ __html: item }} />
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-9 p-0"
                  onClick={() => {
                    handleCopy(data[index]);
                  }}
                >
                  <Clipboard className="h-4 w-4" />
                  <span className="sr-only">Copy</span>
                </Button>
              </div>
            );
          });
    }
  };
  useEffect(() => {
    const storedData = formatData();
    setData(storedData);
    if (storedData.length === 0) {
      router.push("/ref/home");
    }
  }, [router]);
  return (
    <div className="container mx-auto py-10">
      <RefBreadcrumb value="citation" />
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
        {handleDisplay(data, "title")}

        <CollapsibleContent className="space-y-2">
          {handleDisplay(data, "content")}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
