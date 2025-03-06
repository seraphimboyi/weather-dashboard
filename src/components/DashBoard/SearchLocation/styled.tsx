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
  padding: 20px 0px;
`;

export const Title = styled.h2`
  font-size: 36px;
  font-weight: bold;
  color: #7ede88;
`;

export const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  border-radius: 5px;
  padding: 10px;
  font-size: 20px;
  text-align: center;

  &::placeholder {
    color: #b4beca; /* ✅ 讓 placeholder 也能適應背景 */
  }

  &:focus {
    outline: none;
    border: 1px solid rgba(134, 30, 30, 0.8);
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
  border-bottom: 1px solid #b4beca;
  cursor: pointer;
  &:hover {
    color: #86201e;
  }
`;
