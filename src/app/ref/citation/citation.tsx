"use client";

import React from "react";

import Cite from "citation-js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface Props {}

const Page: React.FC<Props> = () => {
  const [output, setOutput] = React.useState<string>("");
  const [formatSelected, setFormatSelected] = React.useState<string>("apa");

  const generateBibliography = async () => {
    let cite = await Cite.async("10.1111/icad.12730");
    const bibliography = cite.format("bibliography", {
      format: "html",
      template: formatSelected,
      lang: "en-US",
    });
    setOutput(bibliography);
  };
  const handleSelectFormat = (format: string) => {
    setFormatSelected(format);
  };

  return (
    <div>
      <Select onValueChange={handleSelectFormat}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Format" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apa">APA</SelectItem>
          <SelectItem value="harvard1">Harvard</SelectItem>
          <SelectItem value="vancouver">Vancouver</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={generateBibliography}>Button</Button>
      <div>
        <h2>Formatted Reference</h2>
        <div dangerouslySetInnerHTML={{ __html: output }} />
      </div>
    </div>
  );
};

export default Page;
