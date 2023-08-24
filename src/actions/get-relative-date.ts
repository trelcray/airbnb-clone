import { formatDistanceToNow, parseISO } from "date-fns";

const getRelativeDate = (date: string) => {
  const targetDate = parseISO(date);
  const options = { addSuffix: true };

  return formatDistanceToNow(targetDate, options);
};

export default getRelativeDate;
