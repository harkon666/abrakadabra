import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { DetailPackageTable } from "../table/detail-package.table";
import { setDialogDetailPackage } from "@/reducers/database";

export const DetailPackageDialog = () => {
  const { dialogDetailPackage } = useAppSelector((state) => state.database);
  const dispatch = useAppDispatch();

  const onClose = () => dispatch(setDialogDetailPackage({}));

  console.log(dialogDetailPackage, "test");

  return (
    <Dialog
      open={dialogDetailPackage?.packageItems || false}
      onOpenChange={(f) => {
        if (!f) {
          onClose();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogDetailPackage.name}</DialogTitle>
        </DialogHeader>
        <DetailPackageTable data={dialogDetailPackage} />
      </DialogContent>
    </Dialog>
  );
};
