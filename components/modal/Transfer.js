import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaWallet } from "react-icons/fa";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../lib/sanity";

const Transfer = ({
  setAction,
  selectedToken,
  walletAddress,
  thirdWebTokens,
}) => {
  const [amount, setAmount] = useState();
  const [recipient, setRecipient] = useState("");
  const [coinImageUrl, setCoinImageUrl] = useState();
  const [activeThirdWebToken, setActiveThirdWebToken] = useState();
  const [balance, setBalance] = useState();

  useEffect(() => {
    if (!selectedToken) return;
    const url = imageUrlBuilder(client).image(selectedToken?.logo).url();
    setCoinImageUrl(url);
  }, [selectedToken]);

  useEffect(() => {
    if (!selectedToken) return;
    const activeToken = thirdWebTokens.find(
      (token) => token.address === selectedToken.contractAddress
    );
    setActiveThirdWebToken(activeToken);
  }, [selectedToken, thirdWebTokens]);

  useEffect(() => {
    const getBalance = async () => {
      const balance = await activeThirdWebToken.balanceOf(walletAddress);
      setBalance(balance.displayValue);
    };

    activeThirdWebToken && getBalance();
  }, [activeThirdWebToken, walletAddress]);

  const sendCrypto = async (recipient, amount) => {
    if (activeThirdWebToken && amount && recipient) {
      setAction("transfering");
      const tx = await activeThirdWebToken.transfer(
        recipient,
        amount.toString().concat("000000000000000000")
      );
      setAction("transfered");
    } else {
      console.log("missing data");
    }
  };

  return (
    <Wrapper>
      <Amount>
        <FlexInputContainer>
          <FlexInput
            type="number"
            placeholder="0"
            onChange={(e) => setAmount(e.target.value)}
          />
          <span>{selectedToken?.symbol}</span>
        </FlexInputContainer>
        <Warning style={{ color: amount && "#0a0b0d" }}>
          Amount is a required field
        </Warning>
      </Amount>
      <TransferForm>
        <Row>
          <FieldName>To</FieldName>
          <CoinSelectList>
            <Icon>
              <FaWallet />
            </Icon>
            <Recipient
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Address"
            />
          </CoinSelectList>
        </Row>
        <Divider />
        <Row>
          <FieldName>Pay with</FieldName>
          <CoinSelectList onClick={() => setAction("select")}>
            <Icon>
              <img src={coinImageUrl} alt="eth" />
            </Icon>
            <CoinName>{selectedToken?.name}</CoinName>
          </CoinSelectList>
        </Row>
      </TransferForm>
      <Row>
        <Continue onClick={() => sendCrypto(recipient, amount)}>
          Continue
        </Continue>
      </Row>
      <Row>
        <BalanceTitle>{selectedToken?.symbol} Balance</BalanceTitle>
        <Balance>
          {balance} {selectedToken?.symbol}
        </Balance>
      </Row>
    </Wrapper>
  );
};

export default Transfer;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
`;
const Amount = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const FlexInputContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-end;

  & > span {
    font-size: 3rem;
    margin-bottom: 0.5rem;
    color: #3773f5;
  }
`;
const FlexInput = styled.input`
  border: none;
  background: none;
  outline: none;
  color: white;
  font-size: 4.5rem;
  text-align: right;
  max-width: 45%;
  margin-right: 1rem;
  color: #3773f5;

  &::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;
const Warning = styled.div`
  padding: 1rem 0 2rem 0;
  text-align: center;
  color: #8a919e;
`;
const TransferForm = styled.div`
  border: 1px solid rgba(91, 97, 110, 0.2);
  border-radius: 0.4rem;
`;
const Divider = styled.div`
  border-bottom: 1px solid rgba(91, 97, 110, 0.2);
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #8a919e;
  padding: 1rem 0;
  font-size: 1.2rem;
`;
const FieldName = styled.div`
  flex: 0.5;
  padding-left: 2rem;
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
const Recipient = styled.input`
  border: none;
  background: none;
  outline: none;
  color: white;
  font-size: 1.2rem;
  margin-right: 0.5rem;
`;
const CoinSelectList = styled.div`
  display: flex;
  flex: 1.3;
  height: 100%;

  &:hover {
    cursor: pointer;
  }
`;
const CoinName = styled.div`
  flex: 1;
  border: none;
  background: none;
  outline: none;
  color: rgb(10, 11, 13);
  font-size: 1.2rem;
  margin-right: 0.5rem;
`;
const Continue = styled.button`
  color: white;
  width: 100%;
  text-align: center;
  background-color: #3773f5;
  padding: 1rem;
  border-radius: 0.4rem;
  font-size: 1.2rem;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;
const Balance = styled.div`
  color: rgb(10, 11, 13);
`;
const BalanceTitle = styled.div``;
