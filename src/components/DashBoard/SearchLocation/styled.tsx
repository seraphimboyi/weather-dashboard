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
  align-items: center;
  justify-content: center;
  row-gap: 20px;
`;

export const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Input = styled.input`
  height: 40px;
  width: 100%;
  border-radius: 5px;
  padding: 10px;
  font-size: 20px;
  text-align: center;

  &:focus {
    outline: none;
    border: 2px solid #c2eb0c;
    background: #b4beca;
  }
`;

export const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  border-radius: 5px;
  border: 1px solid #b4beca;
  padding: 10px;
`;

export const Li = styled.li`
  font-size: 18px;
  color: #7ede88;
  border-bottom: 1px solid #b4beca;
  cursor: pointer;

  &:hover {
    color: #fff;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const ErrorMessage = styled.p`
  color: #ff4d4d;
  font-size: 16px;
  text-align: center;
`;
