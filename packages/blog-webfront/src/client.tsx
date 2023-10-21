import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.js";

createRoot(document.getElementById("app")!).render(<Main />);

function Main() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
