import React, { useState, useEffect, useRef } from "react";
import { FavoriteItem } from "../../../types/favoriteItem";
import {
  Container,
  Ul,
  Li,
  CityButton,
  RemoveButton,
  ToggleButton,
  List,
  Title,
  Icon,
} from "./styled";

type FavoriteProps = {
  favorites: FavoriteItem[];
  onSelectCity: (fav: FavoriteItem) => void;
  onRemoveCity: (name: string, lat: number, lon: number) => void;
};

const Favorite: React.FC<FavoriteProps> = ({
  favorites,
  onSelectCity,
  onRemoveCity,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const handleCityClick = (fav: FavoriteItem) => {
    onSelectCity(fav);
    setIsExpanded(false);
  };

  // ** 監聽全局點擊事件，點擊外部時收回側邊欄**
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isExpanded &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  return (
    <Container ref={sidebarRef} $isExpanded={isExpanded}>
      <ToggleButton
        data-testid="toggle-button"
        aria-expanded={isExpanded}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          "❌"
        ) : (
          <Icon src="/favorite-icon.svg" alt="展開最愛列表" />
        )}
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
