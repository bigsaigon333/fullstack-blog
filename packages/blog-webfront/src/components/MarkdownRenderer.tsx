import DOMPurify from "dompurify";
import { marked } from "marked";
import { memo, useMemo } from "react";

type Props = {
  content: string;
};

const MarkdownRenderer = ({ content }: Props) => {
  const html = useMemo(
    () => DOMPurify.sanitize(marked.parse(content)),
    [content]
  );

  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default memo(MarkdownRenderer);
