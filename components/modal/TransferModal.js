import React, { useState } from "react";
import styled from "styled-components";
import CoinSelector from "./CoinSelector";
import Transfer from "./Transfer";
import { TailSpin } from "react-loader-spinner";
import Receive from "./Receive";

const TransferModal = ({ walletAddress, sanityTokens, thirdWebTokens }) => {
  const [action, setAction] = useState("send");
  const [selectedToken, setSelectedToken] = useState(sanityTokens[0]);
  console.log(selectedToken);
  const selectedStyle = {
    color: "#3773f5",
  };
  const unselectedStyle = {
    border: "1px solid rgba(91, 97, 110, 0.2)",
  };

  const selectedModal = (option) => {
    switch (option) {
      case "send":
        return (
          <Transfer
            setAction={setAction}
            selectedToken={selectedToken || sanityTokens[0]}
            walletAddress={walletAddress}
            thirdWebTokens={thirdWebTokens}
          />
        );
      case "receive":
        return (
          <Receive
            setAction={setAction}
            selectedToken={selectedToken || sanityTokens[0]}
            walletAddress={walletAddress}
          />
        );
      case "select":
        return (
          <CoinSelector
            setAction={setAction}
            selectedToken={selectedToken || sanityTokens[0]}
            setSelectedToken={setSelectedToken}
            walletAddress={walletAddress}
            thirdWebTokens={thirdWebTokens}
            sanityTokens={sanityTokens}
          />
        );
      case "transfering":
        return (
          <Transfering>
            <h2>Transfering...</h2>
            <TailSpin
              height="100"
              width="100"
              color="#3773f5"
              ariaLabel="loading"
            />
          </Transfering>
        );
      case "transfered":
        return <Transfered>Transfer Complete</Transfered>;

      default:
        return (
          <Transfer
            selectedToken={selectedToken || sanityTokens[0]}
            walletAddress={walletAddress}
            thirdWebTokens={thirdWebTokens}
          />
        );
    }
  };

  return (
    <Wrapper>
      <Selector>
        <Option
          style={action === "send" ? selectedStyle : unselectedStyle}
          onClick={() => setAction("send")}
        >
          <p>Send</p>
        </Option>
        <Option
          style={action === "receive" ? selectedStyle : unselectedStyle}
          onClick={() => setAction("receive")}
        >
          <p>Receive</p>
        </Option>
      </Selector>
      <ModalMain>{selectedModal(action)}</ModalMain>
    </Wrapper>
  );
};

export default TransferModal;

const Wrapper = styled.div`
  height: 35rem;
  width: 27rem;
  color: rgb(10, 11, 13);
  border: 1px solid rgba(91, 97, 110, 0.2);
  display: flex;
  flex-direction: column;
`;
const Selector = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 5rem;
`;
const Option = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
  font-size: 1.2rem;
  font-weight: 600;

  &:hover {
    cursor: pointer;
  }
`;
const ModalMain = styled.div`
  padding: 1.5rem;
  flex: 1;
`;
const Transfering = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  font-size: 1.5rem;
  flex-direction: column;
`;
const Transfered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  font-size: 2rem;
  font-weight: 600;
  color: #27ad75;
`;
