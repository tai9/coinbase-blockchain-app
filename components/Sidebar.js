import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { navItems } from "../public/static/navItems";

const Sidebar = () => {
  const [activeIcon, setActiveIcon] = useState(navItems[0].title);
  return (
    <Wrapper>
      <LogoContainer>
        <Logo>CoinOne</Logo>
      </LogoContainer>
      <NavItemsContainer>
        {navItems.map((item, idx) => (
          <NavItem key={idx} onClick={() => setActiveIcon(item.title)}>
            <NavIcon style={{ color: item.title === activeIcon && "#3773f5" }}>
              {item.icon}
            </NavIcon>
            <NavTitle style={{ color: item.title === activeIcon && "#3773f5" }}>
              {item.title}
            </NavTitle>
          </NavItem>
        ))}
      </NavItemsContainer>
    </Wrapper>
  );
};

export default Sidebar;

const Wrapper = styled.div`
  height: calc(100vh);
  border-right: 1px solid #282b2f;
  width: calc(22rem - 16px - 16px);
  padding: 0 1rem;
`;
const LogoContainer = styled.div`
  margin: 1.5rem 0;
`;

const Logo = styled.div`
  color: #3773f5;
  font-size: 2rem;
  font-weight: 700;
  margin-left: 1.5rem;
`;

const NavItemsContainer = styled.div`
  margin-top: 3rem;

  &:hover {
    cursor: pointer;
  }
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  font-weight: 500;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  height: 4rem;

  &:hover {
    background-color: #141519;
  }
`;

const NavIcon = styled.div`
background-color: #141519
padding: 0.7rem;
border-radius: 50%;
margin: 0 1rem;
display:grid;
place-items: center
`;

const NavTitle = styled.div``;
