import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col">
      <div id="Navbar" className="flex flex-row h-[64px] bg-blue-500">
        <div className="m-auto">
          <ConnectButton />
        </div>
      </div>
    </div>
  );
};

export default Home;
