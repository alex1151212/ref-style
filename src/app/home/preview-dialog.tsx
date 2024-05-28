import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Cite from "citation-js";
import BibtexPreviewer from "@/components/bibtex-previewer";

interface Props {
  setOpen: (
    open: boolean
  ) => void | React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  className?: string;
  setData?: React.Dispatch<React.SetStateAction<RefType[]>>;
  selectedRow: RefType | undefined;
  setSelectedRow: React.Dispatch<React.SetStateAction<RefType | undefined>>;
}

export const PreviewDialog: React.FC<Props> = ({
  setOpen,
  open,
  className,
  setData,
  selectedRow,
  setSelectedRow,
}) => {
  const closeHandler = () => {
    setOpen(false);
    setSelectedRow(undefined);
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]" onClose={closeHandler}>
        <DialogHeader>
          <DialogTitle>Preview BibTex</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <BibtexPreviewer src={selectedRow ? selectedRow.bibtex : ""} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
