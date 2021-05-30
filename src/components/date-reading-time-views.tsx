import {ArticleMeta} from "../lib/blog";
import useSWR from "swr";
import useFormattedDate from "../shared/use-formatted-date";

type DateReadingTimeViewsProps = {
  article: ArticleMeta
}

const DateReadingTimeViews = ({article}: DateReadingTimeViewsProps) => {
  const {data} = useSWR("/api/views");
  const views = data?.views[article.slug] ?? "-";
  const date = useFormattedDate(new Date(article.publishedAt));

  return (
    <div className="flex text-gray-500 dark:text-gray-400 text-sm">
      <time dateTime={article.publishedAt}>{date}</time>
      &nbsp;- {article.readTime} minutes read •&nbsp;
      {views} views
    </div>
  );
};

export default DateReadingTimeViews;