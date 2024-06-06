"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

import { useRouter } from "next/navigation";
import { generateBibliography } from "@/lib/utils";

interface props {
  rowSelection: { [index: string]: boolean };
  data: RefType[];
}

const SelectDialog: React.FC<props> = ({ data, rowSelection }) => {
  const router = useRouter();

  const [selectedFormat, setSelectedFormat] = React.useState<string>("apa");
  const handleSelectValueChange = (value: string) => {
    setSelectedFormat(value);
  };
  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="text-white bg-blue-600/100 hover:bg-blue-600/75"
      >
        <Button variant="outline">Format</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Format Select</DialogTitle>
          <DialogDescription>
            {"Select a format to generate the bibliography in."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Format
            </Label>
            <Select onValueChange={handleSelectValueChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a format" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="apa">APA</SelectItem>
                  <SelectItem value="harvard1">Harvard</SelectItem>
                  <SelectItem value="vancouver">Vancouver</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={async () => {
              const bibtexList = data
                .filter((d, index) => {
                  return rowSelection[index] == true;
                })
                .map((d) => d.bibtex);

              const formatedData: string[] = [];

              for (const bibtex of bibtexList) {
                formatedData.push(generateBibliography(bibtex, selectedFormat));
              }

              localStorage.setItem("data", JSON.stringify(formatedData));

              router.push("/ref/citation");
            }}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SelectDialog;
