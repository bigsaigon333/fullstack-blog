import { dehydrate, hydrate, useQueryClient } from "@tanstack/react-query";
import { ReactNode, useId } from "react";
import { isServer } from "../utils/network.js";

type Props = {
  children?: ReactNode;
};

export default function HydrationBoundary({ children }: Props) {
  const queryClient = useQueryClient();
  const id = JSON.stringify(`__RQ${useId()}`);

  if (isServer) {
    const dehydrated = dehydrate(queryClient, {
      shouldDehydrateQuery: (query) => query.state.fetchStatus === "paused",
    });

    const htmls = [
      `window.__REACT_QUERY_STATE__ ||= {};`,
      `window.__REACT_QUERY_STATE__[${id}] = ${JSON.stringify(dehydrated)};`,
    ];

    return (
      <>
        {children}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: htmls.join("\n") }}
        />
      </>
    );
  }

  const rawDehydrated = (window as any)?.__REACT_QUERY_STATE__?.[id];
  if (rawDehydrated == null) return;

  const dehydrated = JSON.parse(rawDehydrated);
  hydrate(queryClient, dehydrated);

  return <>{children}</>;
}
