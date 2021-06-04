import {useMemo} from "react";
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");

const useTimeAgo = (date: number | Date | undefined) => useMemo(() => {
  if (!date) return;
  return timeAgo.format(date, "mini-minute-now");
}, [date]);

export default useTimeAgo;