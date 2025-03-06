import styled from "styled-components";
import { ExtraLarge, Desktop, Tablet, Mobile } from "../../styles/breakpoints";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1340px;
  width: 100%;
  margin: 0 auto;
  row-gap: 20px;
  padding: 0px 12px;
  @media ${Tablet} {
    padding: 0px 24px;
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #2d5178;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #354455;
  }
`;
