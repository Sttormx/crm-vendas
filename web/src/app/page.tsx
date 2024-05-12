"use client"

import NavBar from '@/components/Navbar';
import GlobalStyle from '../styles/global';
import styled from 'styled-components';

const Content = styled.main`
  text-align: center;
  margin-top: 50px;
`;

export default function Home() {
  return (
    <>
      <GlobalStyle />
      <NavBar />
      <Content>
        <h2>Bem vindo!</h2>
      </Content>
    </>
  );
}