import React from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { useRouter } from "next/router";
import Link from "next/link";
import TransferModal from "./modal/TransferModal";

Modal.setAppElement("#__next");

const Header = ({ walletAddress, sanityTokens, thirdWebTokens }) => {
  const router = useRouter();

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%,-50%)",
      backgroundColor: "rgb(255,255,255)",
      padding: 0,
      border: "none",
    },
    overlay: {
      backgroundColor: "rgba(50, 53, 61, 0.33)",
    },
  };

  return (
    <Wrapper>
      <Title>Assets</Title>
      <WalletLink>
        <WalletLinkTitle>Wallet Connected</WalletLinkTitle>
        <WalletAddress>
          {walletAddress?.slice(0, 7)} ... {walletAddress?.slice(35)}
        </WalletAddress>
      </WalletLink>
      <ButtonsContainer>
        <Link href={"/?transfer=1"} passHref>
          <Button>Send / Receive</Button>
        </Link>
      </ButtonsContainer>
      <Modal
        isOpen={!!router.query.transfer}
        onRequestClose={() => router.push("/")}
        style={customStyles}
      >
        <TransferModal
          walletAddress={walletAddress}
          sanityTokens={sanityTokens}
          thirdWebTokens={thirdWebTokens}
        />
      </Modal>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  width: calc(100% - 3rem);
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(91, 97, 110, 0.2);
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: 600;
  flex: 1;
`;

const ButtonsContainer = styled.div`
  display: flex;
`;

const Button = styled.div`
  border: 1px solid rgba(91, 97, 110, 0.2);
  margin: 0 0.5rem;
  padding: 0.8rem;
  font-size: 1.3rem;
  font-weight: 500;
  border-radius: 0.4rem;

  &:hover {
    cursor: pointer;
  }
`;

const WalletLink = styled.div`
  font-size: 1.5rem;
  border: 1px solid rgba(91, 97, 110, 0.2);
  border-radius: 50rem;
  margin-right: 1rem;
  padding: 0.3rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const WalletLinkTitle = styled.div`
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
  color: #27ad75;
  font-weight: 600;
`;

const WalletAddress = styled.div`
  font-size: 0.8rem;
`;
