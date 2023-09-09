import { Dayjs } from "dayjs";

type Props = {
  title: string;
  lastUpdatedAt: Dayjs;
};

const PostListItem = ({ title, lastUpdatedAt }: Props) => {
  return (
    <article className="flex flex-col gap-y-2 mb-8">
      <h2 className="text-xl md:text-2xl font-medium">{title}</h2>
      <p className="self-end text-sm">
        <span>{"최종 수정 시간: "}</span>
        <time dateTime={lastUpdatedAt.toISOString()}>
          {lastUpdatedAt.format("YYYY-MM-DD ddd HH:MM:ss z")}
        </time>
      </p>
    </article>
  );
};

export default PostListItem;
