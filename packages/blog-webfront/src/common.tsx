import { ReactNode } from "react";

type HtmlProps = {
  children?: ReactNode;
};

export function Html({ children }: HtmlProps) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="/public/main.css" rel="stylesheet" />
        <title>김동희입니다</title>
      </head>
      <body>
        <div id="app">{children}</div>
      </body>
    </html>
  );
}
