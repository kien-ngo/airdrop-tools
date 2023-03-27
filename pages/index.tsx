import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useState } from "react";
import TokensTab from "../src/components/tabs/TokensTab";
const NftsTab = dynamic(() => import("../src/components/tabs/NftsTab"));
const SettingsTab = dynamic(() => import("../src/components/tabs/SettingsTab"));

const tabs = ["Tokens", "NFTs", "Settings"] as const;

const Home: NextPage = () => {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("Tokens");

  return (
    <>
      <div className="flex flex-col py-2">
        <div className="tabs tabs-boxed mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tab ${tab === activeTab ? "tab-active" : ""}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      {activeTab === "Tokens" ? (
        <TokensTab />
      ) : activeTab === "NFTs" ? (
        <NftsTab />
      ) : (
        <SettingsTab />
      )}
    </>
  );
};

export default Home;
