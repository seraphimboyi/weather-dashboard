import React from "react";
import {
  Container,
  CloudWrapper,
  Cloud,
  RainContainer,
  RainDrop,
} from "./styled";

const Loading: React.FC = () => {
  return (
    <Container>
      <CloudWrapper>
        <Cloud data-testid="cloud" />
        <RainContainer>
          {Array.from({ length: 5 }).map((_, index) => (
            <RainDrop key={index} data-testid="raindrop" />
          ))}
        </RainContainer>
      </CloudWrapper>
    </Container>
  );
};

export default Loading;
