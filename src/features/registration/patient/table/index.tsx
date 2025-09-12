import { type ColumnDef } from "@tanstack/react-table";
import { type ColumnWidths, type IRegistrationPatient } from "@/types";

import ReusableTable from "@/components/table";

import { EditPatientDialogButton } from "../dialog/edit-patient.dialog";
import { PatientRegistDialogButton } from "../dialog/patient-regist.dialog";
import GenderCell from "@/components/table/cell/gender.cell";
import BirthDateCell from "@/components/table/cell/birthdate.cell";
import FullNameCell from "@/components/table/cell/fullname.cell";
import NIKCell from "@/components/table/cell/nik.cell";
import PatientNumberCell from "@/components/table/cell/patient-number.cell";
import StatusCell from "@/components/table/cell/status.cell";
import DepartmentCell from "@/components/table/cell/department.cell";
import PackageCell from "@/components/table/cell/package.cell";

export const approvedColumn: ColumnDef<IRegistrationPatient>[] = [
  {
    accessorKey: "no",
    header: "No.",
    enableSorting: false,
    cell: ({ row }) => <p>{row.index + 1}.</p>,
  },

  {
    accessorKey: "tempPatientNo",
    header: "Patient No",
    cell: ({ row }) => (
      <PatientNumberCell patientNo={row.original.tempPatientNo} />
    ),
  },
  {
    accessorKey: "ktp",
    header: "NIK",
    cell: ({ row }) => <NIKCell nik={row.original.ktp} />,
  },
  {
    accessorKey: "fullName",
    header: "Patient Info",
    cell: ({ row }) => (
      <FullNameCell name={row.original.fullName} phone={row.original.phone} />
    ),
  },
  {
    accessorKey: "birthDate",
    header: "Birth Date",
    cell: ({ row }) => <BirthDateCell birthDate={row.original.birthDate} />,
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => <GenderCell row={row} />,
  },
  {
    accessorKey: "departement",
    header: "Departement",
    cell: ({
      row: {
        original: { departement, unit },
      },
    }) => <DepartmentCell department={departement} unit={unit} />,
  },
  {
    accessorKey: "packageId",
    header: "Package",
    cell: ({
      row: {
        original: { packageId },
      },
    }) => <PackageCell packageId={packageId} />,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: () => <StatusCell status="pending" />,
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex gap-1 justify-end">
        <PatientRegistDialogButton data={row.original} />
        <EditPatientDialogButton data={row.original} />
      </div>
    ),
  },
];

export const registrationPatientColumn: ColumnWidths = {
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

export const RegistrationPatientTable = ({
  data,
  loading = false,
}: {
  data: IRegistrationPatient[];
  loading?: boolean;
}) => {
  return (
    <ReusableTable
      title="Registration Patient"
      data={data}
      columns={approvedColumn}
      column_width={registrationPatientColumn}
      column_center={["no", "packageId"]}
      column_right={["status", "action"]}
      loading={loading}
      isSorting
    />
  );
};
