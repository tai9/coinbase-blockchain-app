import React, { useState, useEffect } from "react";
import styled from "styled-components";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../lib/sanity";
import { FaCheck } from "react-icons/fa";

const CoinItem = ({
  setAction,
  selectedToken,
  setSelectedToken,
  sender,
  thirdWebTokens,
  sanityTokens,
  token,
}) => {
  const [balance, setBalance] = useState("Fetching...");
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const getBalance = async () => {
      let activeToken;
      thirdWebTokens.map((thirdWebToken) => {
        if (thirdWebToken.address === token.contractAddress) {
          activeToken = thirdWebToken;
        }
      });

      const balance = await activeToken.balanceOf(sender);
      return await setBalance(balance.displayValue.split(".")[0]);
    };

    const getImgUrl = () => {
      const url = imageUrlBuilder(client).image(token?.logo).url();
      setImageUrl(url);
    };

    getImgUrl();
    getBalance();
  }, []);

  return (
    <Wrapper
      style={{
        backgroundColor: token.name === selectedToken.name && "#141519",
      }}
      onClick={() => {
        setSelectedToken(token);
        setAction("send");
      }}
    >
      <Main>
        <Icon>
          <img src={imageUrl} alt={token.symbol} />
        </Icon>
        <NameDetail>
          <Name>{token.name}</Name>
          <Symbol>{token.symbol}</Symbol>
        </NameDetail>
      </Main>
      <Balance>
        {balance} {token.symbol}
      </Balance>
      <IsSelected>
        {selectedToken.contractAddress === token.contractAddress && <FaCheck />}
      </IsSelected>
    </Wrapper>
  );
};

export default CoinItem;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0.5rem;

  &:hover {
    cursor: pointer;
    background-color: #141519;
  }
`;
const Main = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;
const Icon = styled.div`
  margin-right: 1rem;
  height: 1.8rem;
  width: 1.8rem;
  border-radius: 50%;
  overflow: hidden;
  display: grid;
  place-items: center;

  & > img {
    height: 120%;
    width: 120%;
    object-fit: cover;
  }
`;
const NameDetail = styled.div``;
const Name = styled.div`
  font-size: 1.1rem;
  margin-bottom: 0.2rem;
`;
const Symbol = styled.div`
  font-size: 0.8rem;
  color: #888f9b;
`;
const Balance = styled.div``;
const IsSelected = styled.div`
  margin-left: 0.5rem;
  color: #3773f5;
`;
