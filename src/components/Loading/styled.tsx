import styled, { keyframes } from "styled-components";

// ☁️ 雲朵旋轉動畫
const cloudSpin = keyframes`
  0% { transform: rotate(0deg); }
  50% { transform: rotate(5deg); }
  100% { transform: rotate(0deg); }
`;

// 🌧 水滴落下動畫
const rainFall = keyframes`
  0% { transform: translateY(0px); opacity: 1; }
  100% { transform: translateY(30px); opacity: 0; }
`;

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  font-weight: bold;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
`;

// ☁️ 雲朵 Spinner
export const Cloud = styled.div`
  width: 100px;
  height: 40px;
  background: #ffffff;
  border-radius: 50px;
  position: relative;
  animation: ${cloudSpin} 2s ease-in-out infinite;

  &::before,
  &::after {
    content: "";
    position: absolute;
    background: #ffffff;
    border-radius: 50px;
  }

  &::before {
    width: 45px;
    height: 45px;
    top: -15px;
    left: 15px;
  }

  &::after {
    width: 55px;
    height: 50px;
    top: -20px;
    right: 10px;
  }
`;

export const RainContainer = styled.div`
  position: absolute;
  top: 200px;
  display: flex;
  gap: 5px;
`;

export const RainDrop = styled.div`
  width: 2px;
  height: 15px;
  background: white;
  opacity: 0.8;
  animation: ${rainFall} 0.6s linear infinite;
  animation-delay: ${() => Math.random() * 0.5}s;
`;
