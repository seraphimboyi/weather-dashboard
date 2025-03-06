import { useEffect, useRef, useState } from "react";
import { type LocationResult } from "../../../types/weatherApi";
import { Title, Container, InputWrapper, Input, Ul, Li } from "./styled";

type SearchLocationProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setLatitude: (lat: number) => void;
  setLongitude: (lon: number) => void;
  setCityName: (name: string) => void; 
};

const SearchLocation: React.FC<SearchLocationProps> = ({
  searchQuery,
  setSearchQuery,
  setLatitude,
  setLongitude,
  setCityName,
}) => {
  const [locations, setLocations] = useState<LocationResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(true); 

  const inputRef = useRef<HTMLInputElement | null>(null);

  // 監聽輸入框變化，搜尋地點
  useEffect(() => {
    if (searchQuery.length < 2) {
      setLocations([]);
      return;
    }

    const fetchLocations = async () => {
      try {
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery}&count=10&language=en&format=json`
        );
        if (!response.ok) throw new Error("地點搜尋失敗");

        const data = await response.json();
        setLocations(data.results || []);
        setShowSuggestions(true);
      } catch (error) {
        console.error("搜尋地點時發生錯誤:", error);
      }
    };

    fetchLocations();
  }, [searchQuery]);

  return (
    <Container>
      <Title>搜尋地點</Title>
      <InputWrapper>
        <Input
          ref={inputRef}
          type="text"
          placeholder="請輸入城市名稱"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
      </InputWrapper>

      {/* 搜尋結果列表 */}
      {showSuggestions && locations.length > 0 && (
        <Ul>
          {locations.map((location) => (
            <Li
              key={location.id}
              onClick={() => {
                setLatitude(location.latitude);
                setLongitude(location.longitude);
                setCityName(location.name);
                setSearchQuery("");
                setShowSuggestions(false);
                setTimeout(() => {
                  inputRef.current?.blur();
                }, 100);
              }}
            >
              {location.name}, {location.country} ({location.latitude},
              {location.longitude})
            </Li>
          ))}
        </Ul>
      )}
    </Container>
  );
};

export default SearchLocation;
