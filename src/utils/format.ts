export function formatIDR(number: string): string {
  const reset = number.split(".").join("");
  const formatIdr = reset.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return formatIdr;
}

export const onChangeFormatNumber = (value: string): string => {
  const sanitizedValue = value.replace(/[^0-9,]/g, "");

  const [integerPart, decimalPart] = sanitizedValue.split(",");

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return decimalPart !== undefined
    ? `${formattedInteger},${decimalPart}`
    : formattedInteger;
};
