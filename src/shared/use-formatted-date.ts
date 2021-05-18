import {useEffect, useState} from "react";
import dateFormat from "dateformat";

const useFormattedDate = (date: Date) => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const now = new Date();
    let format = "mmm d";
    if (now.getFullYear() != date.getFullYear()) format = "mmm d, yyyy";
    setFormattedDate(dateFormat(date, format));
  }, []);

  return formattedDate;
};

export default useFormattedDate;