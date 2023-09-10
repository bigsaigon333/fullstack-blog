import DOMPurify from "dompurify";
import { marked } from "marked";
import { memo, useMemo } from "react";

marked.use({
  hooks: {
    preprocess: (markdown) => markdown,
    postprocess: (html) => DOMPurify.sanitize(html, { ADD_ATTR: ["target"] }),
  },
  renderer: {
    link: (href, title, text) =>
      `<a href="${href}" target="_blank" rel="noopener noreferrer" ${
        title ? `title=${title}` : ""
      }>${text}</a>`,
  },
});

type Props = {
  content: string;
};

const MarkdownRenderer = ({ content }: Props) => {
  const html = useMemo(() => marked.parse(content), [content]);

  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default memo(MarkdownRenderer);
