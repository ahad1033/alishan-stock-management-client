import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import App from "./App.jsx";
import { SidebarProvider } from "./contexts/SidebarContext";
import { ThemeProvider } from "./components/theme/ThemeProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* --- PROVIDERS --- */}
    <ThemeProvider>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </ThemeProvider>
  </StrictMode>
);
