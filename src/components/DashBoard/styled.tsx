import { styled, keyframes } from "styled-components";
import { ExtraLarge, Desktop, Tablet, Mobile } from "../../styles/breakpoints";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1340px;
  column-gap: 30px;
  width: 100%;
  margin: 0 auto;
  padding: 0px 12px;
  @media ${Tablet} {
    padding: 0px 24px;
  }
  @media ${Desktop} {
    flex-direction: row;
  }
  @media ${ExtraLarge} {
    padding: 0px;
  }
`;

export const WeatherFiled = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

export const Title = styled.h3`
  font-size: 24px;
  font-weight: bold;
  color: #7ede88;
  text-align: center;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
`;

export const Button = styled.button`
  padding: 4px 10px;
  border: none;
  border-radius: 5px;
  background-color: #c2eb0c;
  color: black;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #5cbf6a;
  }
`;

// 定義動畫
const fadeInOut = keyframes`
  0% { opacity: 0; transform: translateY(-10px); }
  10% { opacity: 1; transform: translateY(0); }
  90% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-10px); }
`;

// Toast 訊息樣式
export const ToastMessage = styled.div`
  position: fixed;
  max-width: 300px;
  width: 100%;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: #c2eb0c;
  padding: 12px 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation: ${fadeInOut} 2.5s ease-in-out;
  z-index: 1000;
`;
