"use client";

import GlobalStyle from "@/styles/global";
import Link from "next/link";
import styled from "styled-components";

const Header = styled.header`
  background: #333;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavItem = styled.div`
  color: white;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const NavBar = () => {
  return (
    <>
      <GlobalStyle />
      <Header>
        <h1>CRM</h1>
        <Nav>
          <Link href={`/`}><NavItem>Home</NavItem></Link>
          <Link href={`/clientes`}><NavItem>Clientes</NavItem></Link>
          <Link href={`/agentes`}><NavItem>Agentes</NavItem></Link>
        </Nav>
      </Header>
    </>
  );
}

export default NavBar;