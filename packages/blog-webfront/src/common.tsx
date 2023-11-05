import { ReactNode } from "react";

type HtmlProps = {
  children?: ReactNode;
  assetMap: { js: string[]; css: string[] };
};

export function Html({ children, assetMap }: HtmlProps) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {assetMap.css.map((href) => (
          <link key={href} href={href} rel="stylesheet" />
        ))}
        <title>김동희입니다</title>
      </head>
      <body>
        <div id="app">{children}</div>
      </body>
    </html>
  );
}
