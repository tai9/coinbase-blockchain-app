import React from "react";
import styled from "styled-components";
import CoinItem from "./CoinItem";

const CoinSelector = ({
  setAction,
  selectedToken,
  setSelectedToken,
  walletAddress,
  thirdWebTokens,
  sanityTokens,
}) => {
  return (
    <Wrapper>
      <Title>Select Asset</Title>
      <CoinList>
        {sanityTokens.map((token, idx) => (
          <CoinItem
            key={idx}
            token={token}
            setAction={setAction}
            selectedToken={selectedToken}
            setSelectedToken={setSelectedToken}
            sender={walletAddress}
            thirdWebTokens={thirdWebTokens}
            sanityTokens={sanityTokens}
          />
        ))}
      </CoinList>
    </Wrapper>
  );
};

export default CoinSelector;

const Wrapper = styled.div``;
const Title = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;
const CoinList = styled.div`
  display: flex;
  flex-direction: column;
`;
