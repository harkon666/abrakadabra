export const dateValidation = (date: string) => {
  const year = new Date().getFullYear();
  const [d, m, y] = date.split("-");

  if (
    Number(d) > 31 ||
    Number(m) > 12 ||
    Number(y) > year ||
    !Number(d) ||
    !Number(m)
  )
    return false;
  return true;
};
