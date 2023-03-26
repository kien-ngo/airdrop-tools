import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col">
      <div className="mx-auto text-2xl mt-5">Welcome,</div>
      <div className="mx-auto">
        This tool helps you to transfer multiple tokens in your wallet to a list
        of receipients
      </div>
      <div className="mx-auto mt-10 flex flex-col">
        <Link className="btn" href="/send-native">
          Send native token
        </Link>
        <Link className="btn mt-5" href="/send-tokens">
          Send ERC20 tokens
        </Link>
        <Link className="btn mt-5" href="/send-nfts">
          Send NFTs
        </Link>
      </div>
    </div>
  );
};

export default Home;
