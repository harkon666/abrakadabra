import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { AddCustomerForm } from "../form/add-customer.form";
import { useState } from "react";

export const AddCustomerDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          size={"icon"}
          variant={"outline"}
          className="hover:cursor-pointer"
          title="Add Customer"
          aria-label="Add Customer"
        >
          <Plus size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[40vw] ">
        <DialogHeader className="mb-4">
          <DialogTitle>Add Customer</DialogTitle>
        </DialogHeader>

        {/* form  */}
        <AddCustomerForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};
