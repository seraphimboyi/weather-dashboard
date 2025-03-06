import styled from "styled-components";

export const Container = styled.div`
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

export const Title = styled.h3`
  font-size: 24px;
  font-weight: bold;
  color: #7ede88;
`;

export const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  color: wheat;
`;

export const Li = styled.li`
  font-size: 16px;
`;
