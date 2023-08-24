export const onlyNumbers = (value: string | undefined) => {
  if (!value) return "";

  return value.replace(/[^\d]/g, "");
};
