// src/BibtexPreviewer.js

import React, { useEffect, useState } from "react";
import Cite from "citation-js";
import { Textarea } from "./ui/textarea";
interface Props {
  src: string;
}

const BibtexPreviewer: React.FC<Props> = ({ src }) => {
  const [bibtexPreview, setBibtexPreview] = useState("");

  useEffect(() => {
    handleGenerateBibtex(src);

    // eslint-disable-next-line
  }, [src]);

  const handleGenerateBibtex = (src: string) => {
    try {
      //   const jsonData = JSON.parse(inputData);
      const citation = new Cite(src);
      const bibtex = citation.format("bibtex");
      setBibtexPreview(bibtex);
    } catch (error) {
      setBibtexPreview("Invalid input data. Please enter valid JSON.");
    }
  };

  return <Textarea value={bibtexPreview} readOnly rows={10} />;
};

export default BibtexPreviewer;
