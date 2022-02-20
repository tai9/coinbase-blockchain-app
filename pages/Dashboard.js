import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import styled from "styled-components";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";

import { ThirdwebSDK } from "@3rdweb/sdk";
import { ethers } from "ethers";

const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    process.env.NEXT_PUBLIC_METAMASK_PRIVATE_KEY,
    ethers.getDefaultProvider(
      "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
    )
  )
);

const Dashboard = ({ address }) => {
  const [sanityTokens, setSanityTokens] = useState([]);
  const [thirdWebTokens, setThirdWebTokens] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const coins = await fetch(
          "https://kdq958m0.api.sanity.io/v2021-10-21/data/query/production?query=*%5B%20_type%3D%3D%22coins%22%20%5D%7B%0A%20%20name%2C%0A%20%20contractAddress%2C%0A%20%20usdPrice%2C%0A%20%20symbol%2C%0A%20%20logo%0A%7D"
        );
        const tempSanityTokens = await coins.json();
        console.log(tempSanityTokens.result);
        setSanityTokens(tempSanityTokens.result);

        setThirdWebTokens(
          tempSanityTokens?.result.map((token) =>
            sdk.getTokenModule(token.contractAddress)
          )
        );
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <Wrapper>
      <Sidebar />
      <MainContainer>
        <Header
          walletAddress={address}
          sanityTokens={sanityTokens}
          thirdWebTokens={thirdWebTokens}
        />
        <Main
          walletAddress={address}
          sanityTokens={sanityTokens}
          thirdWebTokens={thirdWebTokens}
        />
      </MainContainer>
    </Wrapper>
  );
};

export default Dashboard;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #0a0b0d;
  color: white;
`;

const MainContainer = styled.div`
  flex: 1;
`;
