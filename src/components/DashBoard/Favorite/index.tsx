import React, { useState } from "react";
import {
  Container,
  Ul,
  Li,
  CityButton,
  RemoveButton,
  ToggleButton,
  List,
  Title,
} from "./styled";

type TypeFavoriteItem = {
  name: string;
  lat: number;
  lon: number;
};

type TypeFavoriteProps = {
  favorites: TypeFavoriteItem[];
  onSelectCity: (fav: TypeFavoriteItem) => void;
  onRemoveCity: (name: string, lat: number, lon: number) => void;
};

const Favorite: React.FC<TypeFavoriteProps> = ({
  favorites,
  onSelectCity,
  onRemoveCity,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleCityClick = (fav: TypeFavoriteItem) => {
    onSelectCity(fav);
    setIsExpanded(false);
  };

  return (
    <Container $isExpanded={isExpanded}>
      <ToggleButton onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? "❌" : "⭐"}
      </ToggleButton>

      <List $isExpanded={isExpanded}>
        <Title>我的最愛城市</Title>
        <Ul>
          {favorites.map((fav) => (
            <Li key={`${fav.name}-${fav.lat}-${fav.lon}`}>
              <CityButton onClick={() => handleCityClick(fav)}>
                {fav.name}
              </CityButton>
              <RemoveButton
                onClick={() => onRemoveCity(fav.name, fav.lat, fav.lon)}
              >
                移除
              </RemoveButton>
            </Li>
          ))}
        </Ul>
      </List>
    </Container>
  );
};

export default Favorite;
