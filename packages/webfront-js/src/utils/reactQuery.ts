import { DefaultOptions } from "@tanstack/react-query";

export const defaultOptions: DefaultOptions = {
  queries: {
    // With SSR, we usually want to set some default staleTime
    // above 0 to avoid refetching immediately on the client
    staleTime: 60 * 1000,
    refetchOnMount: false,
  },
};
