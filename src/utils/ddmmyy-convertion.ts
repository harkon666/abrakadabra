export function ddmmyyConversion(dateStr: string): string {
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const arrDate = dateStr.split("-");
  if (arrDate.length !== 3) {
    throw new Error("Invalid date format. Expected format: DD-MM-YYYY");
  }

  const day = arrDate[2];
  const monthIndex = Number(arrDate[1]);
  const year = arrDate[0];

  if (monthIndex < 1 || monthIndex > 12) {
    throw new Error("Invalid month value");
  }

  return `${day} ${months[monthIndex]} ${year}`;
}
