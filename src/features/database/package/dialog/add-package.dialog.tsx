import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setDialogAddPackage } from "@/reducers/database";
import { useCallback } from "react";
import { AddPackageForm } from "../form/add-package.form";
import { Plus } from "lucide-react";

export const AddPackageDialog = () => {
  const { dialogAddPackage } = useAppSelector((state) => state.database);
  const dispatch = useAppDispatch();
  return (
    <Dialog
      open={dialogAddPackage}
      onOpenChange={(f) => dispatch(setDialogAddPackage(f))}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Package</DialogTitle>
        </DialogHeader>
        <AddPackageForm />
      </DialogContent>
    </Dialog>
  );
};

export const AddPackageDialogButton = () => {
  const dispatch = useAppDispatch();
  const handleOpenDialog = useCallback(() => {
    dispatch(setDialogAddPackage(true));
  }, []);
  return (
    <Button
      onClick={handleOpenDialog}
      variant={"outline"}
      className="text-xs hover:cursor-pointer text-muted-foreground"
    >
      <Plus />
      Package
    </Button>
  );
};
