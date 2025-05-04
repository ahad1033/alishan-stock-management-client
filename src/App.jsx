import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import { ThemeProvider } from "./components/theme/ThemeProvider";

import Analytics from "./pages/Analytics";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Analytics />} />
          {/* <Route path="/products" element={<Products />} /> */}
          {/* <Route path="/customers" element={<Customers />} /> */}
        </Routes>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2000,
            style: {
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(10px)",
              color: "#000",
              border: "1px solid rgba(0, 0, 0, 0.1)",
            },
            success: {
              iconTheme: {
                primary: "#B38A2D",
                secondary: "#fff",
              },
            },
          }}
        />
      </ThemeProvider>
    </Router>
  );
}

export default App;
