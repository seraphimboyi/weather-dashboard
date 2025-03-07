import styled from "styled-components";
import {
  ExtraLarge,
  Desktop,
  Tablet,
  Mobile,
} from "../../../styles/breakpoints";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #333;
  border-radius: 10px;
  background-image: url("/forecast.jpg");
  background-size: cover;
  background-position: center;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8);
`;

export const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 24px;
  padding: 20px 12px;
  justify-content: center;
  width: 100%;
  @media ${Mobile} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${Tablet} {
    grid-template-columns: repeat(3, 1fr);
    padding: 20px;
  }
  @media ${Desktop} {
    grid-template-columns: repeat(4, 1fr);
  }
  @media ${ExtraLarge} {
    grid-template-columns: repeat(5, 1fr);
  }
`;

export const Card = styled.div`
  text-align: center;
  width: 100%;
  border: 1px solid #333;
  border-radius: 10px;
  padding: 20px;
  background-color: rgba(61, 65, 85, 0.7);
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

export const Date = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #c2eb0c;
`;

export const Info = styled.div``;

export const P = styled.p`
  font-size: 16px;
  color: wheat;
`;
