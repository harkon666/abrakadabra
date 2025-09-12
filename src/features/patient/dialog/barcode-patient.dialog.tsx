import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  setDialogBarcode,
  setDialogBarcodeData,
} from "@/reducers/registration";
import type { IRegistrationPatient } from "@/types";
import qrcodePatient from "@/utils/qrcode-barcode";
import { QrCode } from "lucide-react";
import { useEffect, useState } from "react";

export const BarcodePatientDialog = () => {
  const { dialogBarcode, dialogBarcodeData } = useAppSelector(
    (state) => state.registration
  );

  const dispatch = useAppDispatch();
  const [blobUrl, setBlobUrl] = useState<Blob>();
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    if (dialogBarcode && dialogBarcodeData) {
      qrcodePatient(dialogBarcodeData, setBlobUrl);
    }
  }, [dialogBarcode, dialogBarcodeData]);

  useEffect(() => {
    if (blobUrl) {
      const url = URL.createObjectURL(blobUrl);
      setPdfUrl(url);
    }
  }, [blobUrl, setBlobUrl]);

  return (
    <Dialog
      open={dialogBarcode}
      onOpenChange={(f: boolean) => {
        dispatch(setDialogBarcode(f));
      }}
    >
      <DialogContent className="min-w-[1000px] min-h-max bg-transparent border-none shadow-none">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        {blobUrl && (
          <iframe
            name="my-i-frame"
            src={pdfUrl || undefined}
            className="w-full h-[calc(300px-10px)] px-0 mx-0"
            title="PDF Viewer"
            allowFullScreen
            loading="lazy"
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export const BarcodePatientDialogButton = ({
  data,
}: {
  data: IRegistrationPatient;
}) => {
  const dispatch = useAppDispatch();
  return (
    <Button
      onClick={() => {
        dispatch(setDialogBarcode(true));
        dispatch(setDialogBarcodeData(data));
      }}
      disabled={!data.patientNo || data.isPregnant}
      size={"sm"}
      variant={"outline"}
      className="w-7 h-7 hover:cursor-pointer active:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 text-muted-foreground"
    >
      <QrCode size={12} />
    </Button>
  );
};
