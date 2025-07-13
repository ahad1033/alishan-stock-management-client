/* eslint-disable no-undef */

import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // build: {
  //   chunkSizeWarningLimit: 500,
  //   rollupOptions: {
  //     output: {
  //       manualChunks: {
  //         react: ["react", "react-dom"],
  //         redux: ["@reduxjs/toolkit", "react-redux"],
  //         router: ["react-router-dom"],
  //         pdf: ["@react-pdf/renderer"],
  //         charts: ["recharts"],
  //         icons: ["lucide-react"],
  //       },
  //     },
  //   },
  // },

  // build: {
  //   chunkSizeWarningLimit: 500,
  //   rollupOptions: {
  //     output: {
  //       manualChunks(id) {
  //         if (id.includes("components/analytics")) return "charts";
  //         if (
  //           id.includes("components/invoice") ||
  //           id.includes("pages/invoice/invoicePDF")
  //         )
  //           return "pdf";

  //         if (id.includes("node_modules/react")) return "react";
  //         if (id.includes("node_modules/@reduxjs")) return "redux";
  //         if (id.includes("node_modules/react-router-dom")) return "router";
  //         if (id.includes("node_modules/@react-pdf")) return "pdf-vendor";
  //         if (id.includes("node_modules/recharts")) return "charts-vendor";
  //         if (id.includes("node_modules/lucide-react")) return "icons";
  //       },
  //     },
  //   },
  // },

  build: {
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // 🌐 Core vendors
          if (id.includes("node_modules")) {
            if (id.includes("react-pdf")) return "pdf-vendor";
            if (id.includes("recharts")) return "charts-vendor";
            if (id.includes("lucide-react")) return "icons";
            if (id.includes("react-router-dom")) return "router";
            if (id.includes("@reduxjs/toolkit") || id.includes("react-redux"))
              return "redux";
            if (id.includes("react")) return "react";
          }

          // 🧩 Chunk by page features
          if (id.includes("src/pages/invoice")) return "invoice";
          if (id.includes("src/pages/analytics")) return "analytics";
          if (id.includes("src/pages/employee")) return "employee";
          if (id.includes("src/pages/customer")) return "customer";
          if (id.includes("src/pages/stock")) return "stock";
          if (id.includes("src/pages/expense")) return "expense";

          // 📦 Split major heavy reusable components
          if (id.includes("src/components/analytics"))
            return "analytics-components";
          if (id.includes("src/components/invoice"))
            return "invoice-components";

          return undefined; // default fallback
        },
      },
    },
  },
});
