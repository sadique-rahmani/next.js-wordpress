"use client";

import React from "react";
import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";
import MuiThemeProvider from "./MuiThemeRegistry/MuiThemeProvider";
import { Provider } from "react-redux";
import { store } from "@/redux-store/store";
import Header from "./Header";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import InactivityGuard from "./InactivityGuard";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export default function CommonRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const persistor = persistStore(store);

  return (
    <html lang="en">
      <body className={poppins.className}>
        <MuiThemeProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor} />
            <InactivityGuard>
              <Header />

              {children}
            </InactivityGuard>
          </Provider>
        </MuiThemeProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
