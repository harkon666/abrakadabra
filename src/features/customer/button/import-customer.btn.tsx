import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FileCheck2, Loader2 } from "lucide-react";
import { useState } from "react";
import { ToastError, ToastSuccess } from "@/utils/toast";
import { useImportCustomerMutation } from "@/services/queries/customer";
import { useNavigate } from "@tanstack/react-router";

export default function ImportCustomerBtn() {
  const [file, setFile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { mutate, isPending } = useImportCustomerMutation();
  const nav = useNavigate({
    from: "/customer",
  });

  const allowedTypes = [
    "text/csv",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];

    if (!allowedTypes.includes(selectedFile.type)) {
      ToastError("Please select a CSV or Excel file (.csv, .xls, .xlsx)");
      setFile(null);
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      ToastError("File size must be less than 5MB");
      setFile(null);
      return;
    }
    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    if (!file) {
      ToastError("Please select a file to import");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    mutate(file, {
      onSuccess: ({ message }) => {
        setIsSuccess(true);
        nav({
          to: "/customer",
          search: {
            page: 1,
            limit: 20,
          },
        });
        ToastSuccess(message);
      },
    });
  };

  const resetState = () => {
    setFile(null);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) resetState();
      }}
    >
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          title="Import Customers"
          onClick={() => setIsOpen(true)}
          className="hover:cursor-pointer"
        >
          <FileCheck2 size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Import Customers</DialogTitle>
        </DialogHeader>

        {isSuccess ? (
          <div className="flex py-4 items-center justify-center text-center  text-green-600">
            <div className="space-y-2">
              <div className="rounded-full bg-green-100 p-2 mx-auto w-fit">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="font-medium">Customers imported successfully!</p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Input
                id="customerFile"
                type="file"
                accept=".csv,.xls,.xlsx"
                onChange={handleFileChange}
              />
              <p className="text-xs text-gray-500 p">
                Accepted formats: CSV, Excel (.csv, .xls, .xlsx). Max size: 5MB.
              </p>
            </div>
          </>
        )}

        {isSuccess ? (
          <DialogFooter className={"sm:justify-end "}>
            <Button onClick={() => setIsSuccess(false)}>Import again</Button>
          </DialogFooter>
        ) : (
          <DialogFooter className={"sm:justify-end"}>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!file || isPending || isSuccess}
              className="min-w-[80px]"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Importing
                </>
              ) : (
                "Import"
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
