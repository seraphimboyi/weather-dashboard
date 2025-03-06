import React, { ReactNode } from "react";
import { Header, Footer, Main, Title, CopyRight } from "./styled";
import { Container } from "./styled";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
      <Header>
        <Title>全球天氣查詢</Title>
      </Header>
      <Main>{children}</Main>
      <Footer>
        <CopyRight>© 2025 Weather App</CopyRight>
      </Footer>
    </Container>
  );
};

export default Layout;
