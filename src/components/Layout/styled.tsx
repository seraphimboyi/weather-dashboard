import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;
  row-gap: 16px;
`;

export const Header = styled.header`
  background-color: #333;
  text-align: center;
  color: #7ede88;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8);
`;

export const Title = styled.h1`
  font-size: 40px;
  font-weight: bold;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const Footer = styled.footer`
  text-align: center;
  color: #fff;
  background-color: #333;
`;

export const CopyRight = styled.p`
  height: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
