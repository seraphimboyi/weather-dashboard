import styled from "styled-components";
import {
  ExtraLarge,
  Desktop,
  Tablet,
  Mobile,
} from "../../../styles/breakpoints";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;
  justify-content: center;
  border: 1px solid #333;
  border-radius: 10px;
  background-image: url("/current.jpg");
  background-size: initial;
  background-position: top;
  padding: 40px 12px;
  @media ${Tablet} {
    flex-direction: row;
    text-align: left;
    gap: 40px;
  }
`;

export const City = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 6px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 6px;
`;

export const Span = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #c2eb0c;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8);
`;

export const P = styled.p`
  font-size: 18px;
  color: wheat;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8);
`;

export const Button = styled.button`
  position: absolute;
  background-color: #c2eb0c;
  right: 10px;
  top: 10px;
  padding: 4px 10px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #5cbf6a;
  }
`;
