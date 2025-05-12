import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import App from "./App.jsx";

import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { SidebarProvider } from "./contexts/SidebarContext";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "./components/theme/ThemeProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* --- PROVIDERS --- */}
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <SidebarProvider>
            <App />
          </SidebarProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
