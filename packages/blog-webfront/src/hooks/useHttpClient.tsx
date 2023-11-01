import { PropsWithChildren, createContext, useContext } from "react";
import { http } from "../utils/network.js";

const httpClientContext = createContext(http);

export function HttpClientProvider({
  children,
  value,
}: PropsWithChildren<{ value: typeof http }>) {
  return (
    <httpClientContext.Provider value={value}>
      {children}
    </httpClientContext.Provider>
  );
}

export default function useHttpClient() {
  return useContext(httpClientContext);
}
