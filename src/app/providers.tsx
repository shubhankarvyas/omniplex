"use client";

import Script from "next/script";
import { Toaster } from "react-hot-toast";
import { NextUIProvider } from "@nextui-org/react";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NextUIProvider>
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-4L0TGM4R80" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-4L0TGM4R80');
          `}
          </Script>

          {children}
          <Toaster />

        </NextUIProvider>
      </PersistGate>
    </Provider>
  );
}
