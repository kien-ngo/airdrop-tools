import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ConnectWallet, ThirdwebProvider } from "@thirdweb-dev/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={"avalanche-fuji"}>
      <div className="flex flex-col">
        <div id="Navbar" className="flex flex-row h-[64px] bg-indigo-700">
          <div className="m-auto">
            <ConnectWallet />
          </div>
        </div>
        <Component {...pageProps} />
      </div>
    </ThirdwebProvider>
  );
}

export default MyApp;
