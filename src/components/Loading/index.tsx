import React from "react";
import { Container, Cloud, RainContainer, RainDrop } from "./styled";

const Loading: React.FC = () => {
  return (
    <Container>
      <RainContainer>
        <RainDrop />
        <RainDrop />
        <RainDrop />
        <RainDrop />
        <RainDrop />
      </RainContainer>
      <Cloud />
    </Container>
  );
};

export default Loading;
