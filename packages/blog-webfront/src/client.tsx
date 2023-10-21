import { QueryClientProvider } from "@tanstack/react-query";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.js";
import { globalQueryClient } from "./utils/reactQuery.js";

hydrateRoot(document.getElementById("app")!, <Main />);

function Main() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={globalQueryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  );
}
