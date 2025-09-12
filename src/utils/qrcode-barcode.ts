import type { IRegistrationPatient } from "@/types";
import pdfMake from "pdfmake/build/pdfmake";
import type { TDocumentDefinitions } from "pdfmake/interfaces";

pdfMake.fonts = {
  Roboto: {
    normal:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Regular.ttf",
    bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Medium.ttf",
    italics:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Italic.ttf",
    bolditalics:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-MediumItalic.ttf",
  },
};

export default function qrcodePatient(
  data: IRegistrationPatient,
  setBlobUrl: (blob: Blob) => void
) {
  const dd: TDocumentDefinitions = {
    pageMargins: [0, 0, 0, 0],
    pageOrientation: "landscape",
    pageSize: "B10",
    defaultStyle: {
      fontSize: 6,
    },
    content: [
      {
        text: "Return Form",
        fontSize: 12,
        marginLeft: 0,
        marginTop: 2,
        marginBottom: 1,
        bold: true,
      },
      {
        columns: [
          {
            qr: data.id,
            fit: 58.5,
            marginLeft: 0,
            marginTop: 3,
            bold: true,
          },
          [
            {
              text: data.patientNo?.substring(10, 16) || "N/A",
              marginTop: 0,
              fontSize: 12,
              bold: true,
            },
            {
              text: data.fullName.split(" ").splice(0, 3).join(" "),
              marginTop: 2,
              fontSize: 10,
              marginRight: 2,
            },
            {
              text: new Date(data.created_at).toLocaleDateString("en-GB"),
              marginTop: 2,
              fontSize: 10,
            },
          ],
        ],
      },
    ],
  };

  const pdfGenerator = pdfMake.createPdf(dd);
  pdfGenerator.getBlob((blob) => {
    setBlobUrl(blob);
  });
  return pdfGenerator;
}
