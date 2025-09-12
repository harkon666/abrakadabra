import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

interface ExcelColumn {
  header: string;
  width: number;
  alignment?: Partial<ExcelJS.Alignment>;
}
const EXCEL_COLUMNS: ExcelColumn[] = [
  { header: "Fullname", width: 30, alignment: { horizontal: "center" } },
  { header: "Email", width: 30, alignment: { horizontal: "center" } },
  { header: "Password", width: 30, alignment: { horizontal: "center" } },
  { header: "KTP", width: 30, alignment: { horizontal: "center" } },
  { header: "Birth Date", width: 25, alignment: { horizontal: "center" } },
  { header: "Phone", width: 25, alignment: { horizontal: "center" } },
  { header: "Gender", width: 25, alignment: { horizontal: "center" } },
  { header: "Unit", width: 25, alignment: { horizontal: "center" } },
  { header: "Departement", width: 25, alignment: { horizontal: "center" } },
  { header: "CustomerId", width: 30, alignment: { horizontal: "center" } },
];

const configureWorksheetStyling = (
  worksheet: ExcelJS.Worksheet,
  columns: ExcelColumn[]
): void => {
  worksheet.columns = columns.map(({ header, width, alignment }) => ({
    header,
    width,
    ...(alignment && alignment),
  }));

  const headerRow = worksheet.getRow(1);
  headerRow.font = { bold: true };
  headerRow.alignment = { vertical: "middle", horizontal: "center" };
};

export async function patientTemplateExcel(customerId: string) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("patient");
  const headerRow = worksheet.getRow(1);

  // Style header row
  for (let i = 1; i <= 10; i++) {
    headerRow.getCell(i).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "a4c2f4" },
    };
  }

  configureWorksheetStyling(worksheet, EXCEL_COLUMNS);

  const exampleData = [
    "John Doe",
    "johndoe@example.com",
    "password123",
    "3271046708890001",
    "13-04-2025",
    "081234567890",
    "1",
    "IT",
    "DIVISI IT",
    customerId,
  ];

  const exampleRow = worksheet.addRow(exampleData);

  exampleRow.eachCell((cell) => {
    cell.alignment = { horizontal: "center", vertical: "middle" };
    cell.font = { italic: true, color: { argb: "808080" } };
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const filename = `patient-template.xlsx`;
  saveAs(blob, filename);
}
