import Script from "next/script";
import { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { ChakraProvider } from "@chakra-ui/react";
import { FundraiserProvider } from "@/context/FundraiserContext";
import AuthLayout from "@/layouts/AuthLayout";
import { ToastContainer } from "@/services/toast";
import { AuthProvider } from "@/context/AuthContext";

import "@/styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider>
    <ThemeProvider attribute="class">
      <AuthProvider>
        <FundraiserProvider>
          <AuthLayout>
            <Component {...pageProps} />
          </AuthLayout>
          <ToastContainer />
          <Script
            src="https://kit.fontawesome.com/d45b25ceeb.js"
            crossOrigin="anonymous"
          />
        </FundraiserProvider>
      </AuthProvider>
    </ThemeProvider>
  </ChakraProvider>
);

export default App;
