import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  row-gap: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #333;
  border-radius: 10px;
  background-image: url("/current.jpg");
  background-size: cover;
  background-position: center;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8);
  padding: 20px 0px;
`;

export const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  color: wheat;
`;

export const Li = styled.li`
  font-size: 20px;
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
