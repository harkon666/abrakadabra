import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setDialogAddPackageItem } from "@/reducers/database";
import { useCallback } from "react";
import { Plus } from "lucide-react";
import { AddPackageItemForm } from "../form/add-package-item.form";

export const AddPackageItemDialog = () => {
  const { dialogAddPackageItem } = useAppSelector((state) => state.database);
  const dispatch = useAppDispatch();
  return (
    <Dialog
      open={dialogAddPackageItem}
      onOpenChange={(f) => dispatch(setDialogAddPackageItem(f))}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Package Item</DialogTitle>
        </DialogHeader>
        <AddPackageItemForm />
      </DialogContent>
    </Dialog>
  );
};

export const AddPackageItemDialogButton = () => {
  const dispatch = useAppDispatch();
  const handleOpenDialog = useCallback(() => {
    dispatch(setDialogAddPackageItem(true));
  }, []);
  return (
    <Button
      onClick={handleOpenDialog}
      variant={"outline"}
      className="text-xs hover:cursor-pointer text-muted-foreground"
    >
      <Plus />
      Package item
    </Button>
  );
};
