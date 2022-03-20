import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { coins } from "../public/static/coins";
import Coin from "./Coin";
import BalanceChart from "./BalanceChart";

const Portfolio = ({ walletAddress, sanityTokens, thirdWebTokens }) => {
  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    const tokenToUSD = {};

    for (const token of sanityTokens) {
      tokenToUSD[token.contractAddress] = Number(token.usdPrice);
    }

    const calculateTotalBalance = async () => {
      const totalBalance = await Promise.all(
        thirdWebTokens.map(async (token) => {
          const balance = await token.balanceOf(walletAddress);
          return Number(balance.displayValue) * tokenToUSD[token.address];
        })
      );
      setWalletBalance(totalBalance.reduce((acc, curr) => acc + curr, 0));
    };
    return calculateTotalBalance();
  }, [sanityTokens, thirdWebTokens, walletAddress]);

  return (
    <Wrapper>
      <Content>
        <Chart>
          <div>
            <Balance>
              <BalanceTitle>Portfolio balance</BalanceTitle>
              <BalanceValue>
                {"$"}
                {walletBalance.toLocaleString()}
              </BalanceValue>
            </Balance>
          </div>
          <BalanceChart />
        </Chart>
        <PortfolioTable>
          <TableItem>
            <Title>Your Assets</Title>
          </TableItem>
          <Divider />
          <Table>
            <TableItem>
              <TableRow>
                <div style={{ flex: 3 }}>Name</div>
                <div style={{ flex: 2 }}>Balance</div>
                <div style={{ flex: 1 }}>Price</div>
                <div style={{ flex: 1 }}>Allocation</div>
                <div style={{ flex: 0 }}>
                  <BsThreeDotsVertical />
                </div>
              </TableRow>
            </TableItem>
          </Table>
          <Divider />
          <div>
            {coins.map((coin, idx) => (
              <div key={idx}>
                <Coin coin={coin} />
                <Divider />
              </div>
            ))}
          </div>
        </PortfolioTable>
      </Content>
    </Wrapper>
  );
};

export default Portfolio;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
`;

const Content = styled.div`
  width: 100%;
  max-width: 1000px;
  padding: 2rem 1rem;
`;

const Chart = styled.div`
  border: 1px solid rgba(91, 97, 110, 0.2);
  padding: 1rem 2rem;
`;
const Balance = styled.div``;
const BalanceTitle = styled.div`
  color: #8a919e;
  font-size: 0.9rem;
`;
const BalanceValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0.5rem 0;
`;

const PortfolioTable = styled.div`
  margin-top: 1rem;
  border: 1px solid rgba(91, 97, 110, 0.2);
`;

const Table = styled.table`
  width: 100%;
`;

const TableRow = styled.tr`
  width: 100%;
  display: flex;
  justify-content: space-between;

  & > th {
    text-align: left;
  }
`;

const Divider = styled.div`
  border-bottom: 1px solid rgba(91, 97, 110, 0.2);
`;

const TableItem = styled.div`
  padding: 1rem 2rem;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;
