import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import {
  ConnectButton,
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, polygonMumbai, sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import {
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
  coinbaseWallet,
  ledgerWallet,
  metaMaskWallet,
  safeWallet,
  trustWallet,
} from "@rainbow-me/rainbowkit/wallets";

const { chains, provider } = configureChains(
  [mainnet, polygon, polygonMumbai, sepolia],
  [publicProvider()]
);
const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      metaMaskWallet({ chains }),
      walletConnectWallet({ chains }),
      coinbaseWallet({ chains, appName: "MOME" }),
      ledgerWallet({ chains }),
      trustWallet({ chains }),
      injectedWallet({ chains }),
      safeWallet({ chains }),
      rainbowWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        appInfo={{
          appName: "MOME",
          learnMoreUrl: "https://google.com",
        }}
      >
        <div className="flex flex-col">
          <div id="Navbar" className="flex flex-row h-[64px] bg-indigo-700">
            <div className="m-auto">
              <ConnectButton />
            </div>
          </div>
          <Component {...pageProps} />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
