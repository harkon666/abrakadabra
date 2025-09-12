import { type ColumnDef } from "@tanstack/react-table";
import { type ColumnWidths, type IRegistrationPatient } from "@/types";

import ReusableTable from "@/components/table";

import { BarcodePatientDialogButton } from "../dialog/barcode-patient.dialog";
import { EditPatientDialogButton } from "../dialog/edit-patient.dialog";
import FullNameCell from "@/components/table/cell/fullname.cell";
import PatientNumberCell from "@/components/table/cell/patient-number.cell";
import NIKCell from "@/components/table/cell/nik.cell";
import BirthDateCell from "@/components/table/cell/birthdate.cell";
import DepartmentCell from "@/components/table/cell/department.cell";
import PackageCell from "@/components/table/cell/package.cell";
import StatusCell from "@/components/table/cell/status.cell";
import GenderCell from "@/components/table/cell/gender.cell";

export const patientTableColumn: ColumnDef<IRegistrationPatient>[] = [
  {
    accessorKey: "no",
    header: "No.",
    enableSorting: false,
    cell: ({ row }) => (
      <div className="text-center text-xs text-muted-foreground font-medium">
        {row.index + 1}.
      </div>
    ),
  },
  {
    accessorKey: "tempPatientNo",
    header: "Patient No",
    enableSorting: false,
    cell: ({ row }) => <PatientNumberCell patientNo={row.original.patientNo} />,
  },
  {
    accessorKey: "ktp",
    header: "NIK",
    enableSorting: false,
    cell: ({ row }) => <NIKCell nik={row.original.ktp} />,
  },
  {
    accessorKey: "fullName",
    header: "Patient Info",
    enableSorting: false,
    cell: ({ row }) => (
      <FullNameCell name={row.original.fullName} phone={row.original.phone} />
    ),
  },
  {
    accessorKey: "birthDate",
    header: "Birth Date",
    enableSorting: false,
    cell: ({ row }) => <BirthDateCell birthDate={row.original.birthDate} />,
  },
  {
    accessorKey: "gender",
    header: "Gender",
    enableSorting: false,
    cell: ({ row }) => <GenderCell row={row} />,
  },
  {
    accessorKey: "unit",
    header: "Department",
    enableSorting: false,
    cell: ({ row }) => (
      <DepartmentCell
        unit={row.original.unit}
        department={row.original.departement}
      />
    ),
  },
  {
    accessorKey: "packageId",
    header: "Package",
    enableSorting: false,
    cell: ({ row }) => (
      <PackageCell packageId={row.original.packageId || "A"} />
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: false,
    cell: () => <StatusCell status="registered" />,
  },
  {
    accessorKey: "action",
    header: "Action",
    enableSorting: false,
    cell: ({ row }) => (
      <div className="flex gap-1 justify-end">
        <EditPatientDialogButton data={row.original} />
        <BarcodePatientDialogButton data={row.original} />
      </div>
    ),
  },
];

export const patientTableColumnWidth: ColumnWidths = {
  no: "3%",
  tempPatientNo: "8%",
  ktp: "10%",
  fullName: "18%",
  birthDate: "12%",
  gender: "10%",
  unit: "15%",
  packageId: "8%",
  status: "8%",
  action: "12%",
};

export const PatientTable = ({
  data,
  loading = false,
}: {
  data: IRegistrationPatient[];
  loading?: boolean;
}) => {
  return (
    <ReusableTable
      title="Patient List"
      data={data}
      columns={patientTableColumn}
      column_width={patientTableColumnWidth}
      column_center={["no", "packageId"]}
      column_right={["status", "action"]}
      loading={loading}
      isSorting
    />
  );
};
