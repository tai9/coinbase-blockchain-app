import React from "react";
import Portfolio from "./Portfolio";
import styled from "styled-components";
import Promos from "./Promos";

const Main = ({ walletAddress, sanityTokens, thirdWebTokens }) => {
  return (
    <Wrapper>
      <Portfolio
        walletAddress={walletAddress}
        sanityTokens={sanityTokens}
        thirdWebTokens={thirdWebTokens}
      />
      <Promos />
    </Wrapper>
  );
};

export default Main;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  max-height: calc(100vh - 64px);
  overflow: scroll;

  & div {
    border-radius: 0.4rem;
    overflow: auto;
  }
`;
