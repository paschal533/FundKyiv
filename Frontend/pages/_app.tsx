import Script from "next/script";
import { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { ChakraProvider } from "@chakra-ui/react";
import { FundraiserProvider } from "../context/FundraiserContext";
import { Footer, Navbar } from "../components";
import AuthLayout from "../layouts/AuthLayout";
import { ToastContainer } from "../services/toast";

import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => (
  <FundraiserProvider>
    <ChakraProvider>
      <ThemeProvider attribute="class">
        <AuthLayout>
          <div className="min-h-screen bg-white dark:bg-nft-dark">
            <Navbar />
            <div className="pt-65">
              <Component {...pageProps} />
            </div>
            <Footer />
          </div>
        </AuthLayout>

        <ToastContainer />
        <Script
          src="https://kit.fontawesome.com/d45b25ceeb.js"
          crossOrigin="anonymous"
        />
      </ThemeProvider>
    </ChakraProvider>
  </FundraiserProvider>
);

export default App;
