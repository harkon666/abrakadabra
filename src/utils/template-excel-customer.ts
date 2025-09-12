import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

interface ExcelColumn {
  header: string;
  width: number;
  alignment?: Partial<ExcelJS.Alignment>;
}
const EXCEL_COLUMNS: ExcelColumn[] = [
  { header: "Name", width: 30, alignment: { horizontal: "center" } },
  { header: "Email", width: 30, alignment: { horizontal: "center" } },
  { header: "Password", width: 30, alignment: { horizontal: "center" } },
  { header: "Address", width: 30, alignment: { horizontal: "center" } },
  { header: "Address 2", width: 25, alignment: { horizontal: "center" } },
  { header: "City", width: 25, alignment: { horizontal: "center" } },
  { header: "Zip Code", width: 25, alignment: { horizontal: "center" } },
  { header: "Phone", width: 25, alignment: { horizontal: "center" } },
  { header: "Fax", width: 25, alignment: { horizontal: "center" } },
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

export async function customerTemplateExcel() {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("customer");
  const row = worksheet.getRow(1);
  for (let i = 1; i <= 9; i++) {
    row.getCell(i).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "a4c2f4" },
    };
  }

  configureWorksheetStyling(worksheet, EXCEL_COLUMNS);

  const exampleData = [
    "Bobby",
    "bobby@example.com",
    "password123",
    "address 1",
    "address 2",
    "Tangerang Selatan",
    "15412",
    "0812345678340",
    "1234567",
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

  const filename = `customer-template.xlsx`;
  saveAs(blob, filename);
}
