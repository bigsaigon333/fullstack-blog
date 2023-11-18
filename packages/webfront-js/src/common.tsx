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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/public/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/public/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/public/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/public/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/public/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
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
