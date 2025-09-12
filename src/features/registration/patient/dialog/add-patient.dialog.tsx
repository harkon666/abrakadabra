import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AddPatientForm } from "../form/add-patient.form";

export const AddPatientDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          size={"icon"}
          variant={"outline"}
          className="text-muted-foreground"
        >
          <Plus size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[400px]">
        <DialogHeader className="mb-4">
          <DialogTitle>Add Patient</DialogTitle>
        </DialogHeader>

        {/* form  */}
        <AddPatientForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};
