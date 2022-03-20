import { useWeb3 } from "@3rdweb/hooks";
import styled from "styled-components";
import Dashboard from "./Dashboard";

export default function Home() {
  const { address, connectWallet } = useWeb3();
  return (
    <Wrapper>
      {address ? (
        <Dashboard address={address} />
      ) : (
        <WalletConnect>
          <Button onClick={() => connectWallet("injected")}>
            Connect wallet
          </Button>
          <Details>
            You need Chrome to be <br /> able to run this app.
          </Details>
        </WalletConnect>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  height: 100vh;
  max-width: 100vw;
  background-color: rgba(0, 62, 193, 0.03);
  color: rgb(10, 11, 13);
  place-items: center;
`;

const WalletConnect = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.div`
  border: 1px solid rgba(91, 97, 110, 0.2);
  padding: 0.8rem;
  font-size: 1.3rem;
  font-weight: 500;
  border-radius: 0.4rem;
  background-color: #3773f5;
  color: white;

  &:hover {
    cursor: pointer;
  }
`;

const Details = styled.div`
  font-size: 1.2rem;
  margin-top: 1rem;
  text-align: center;
`;
