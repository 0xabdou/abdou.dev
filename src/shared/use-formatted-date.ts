import {useMemo} from "react";
import dateFormat from "dateformat";

const useFormattedDate = (date: Date | number | undefined) => useMemo(() => {
  if (!date) return;
  let mDate: Date;
  if (typeof date == "number") mDate = new Date(date);
  else mDate = date;
  const now = new Date();
  let format = "mmm d";
  if (now.getFullYear() != mDate.getFullYear()) format = "mmm d, yyyy";
  return dateFormat(date, format);
}, [date]);

export default useFormattedDate;