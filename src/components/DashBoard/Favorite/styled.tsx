import styled from "styled-components";

type ContainerProps = {
  $isExpanded: boolean;
};

type ListProps = {
  $isExpanded: boolean;
};

export const Container = styled.div<ContainerProps>`
  padding-top: 60px;
  position: fixed;
  z-index: 1000;
  left: ${({ $isExpanded }) => ($isExpanded ? "0" : "-375px")};
  top: 0;
  width: 100%;
  max-width: 375px;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  transition: left 0.3s ease-in-out;
  box-shadow: ${({ $isExpanded }) =>
    $isExpanded ? "2px 0px 5px rgba(0,0,0,0.3)" : "none"};
`;

export const Title = styled.h3`
  font-size: 24px;
`;

export const List = styled.div<ListProps>`
  opacity: ${({ $isExpanded }) => ($isExpanded ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
  padding: 10px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

export const Ul = styled.ul``;

export const Li = styled.li`
  padding: 4px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CityButton = styled.button`
  text-align: left;
  max-width: 280px;
  background-color: #c2eb0c;
  color: black;
  border: none;
  font-size: 18px;
  padding: 4px 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: left 0.3s ease-in-out;

  &:hover {
    background-color: #5cbf6a;
  }
`;

export const RemoveButton = styled.button`
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background: darkred;
  }
`;

export const ToggleButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 12px;
  top: 10px;
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 12px;
  cursor: pointer;
  border-radius: 50%;
  transition: left 0.3s ease-in-out;

  &:hover {
    background: #0056b3;
  }
`;

export const Icon = styled.img`
  width: 100%;
  height: 100%;
`;
