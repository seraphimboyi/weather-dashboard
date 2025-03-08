import React, { ReactNode } from "react";
import { Header, Footer, Main, Title, CopyRight, Container } from "./styled";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  //  點擊後重新整理頁面
  const handleTitleClick = () => {
    window.location.reload();
  };

  return (
    <Container>
      <Header>
        <Title onClick={handleTitleClick}>全球天氣查詢</Title>
      </Header>
      <Main>{children}</Main>
      <Footer>
        <CopyRight>© 2025 Weather App</CopyRight>
      </Footer>
    </Container>
  );
};

export default Layout;
