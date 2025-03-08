import React from "react";
import { Container, Cloud, RainContainer, RainDrop } from "./styled";

const Loading: React.FC = () => {
  return (
    <Container>
      <RainContainer>
        <RainDrop data-testid="raindrop" />
        <RainDrop data-testid="raindrop" />
        <RainDrop data-testid="raindrop" />
        <RainDrop data-testid="raindrop" />
        <RainDrop data-testid="raindrop" />
      </RainContainer>
      <Cloud data-testid="cloud" />
    </Container>
  );
};

export default Loading;
