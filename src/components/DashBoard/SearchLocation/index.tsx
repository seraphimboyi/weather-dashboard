import React from "react";
import { useEffect, useRef, useState } from "react";
import { type LocationResult } from "../../../types/weatherApi";
import { Container, InputWrapper, Input, Ul, Li } from "./styled";

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
  const abortControllerRef = useRef<AbortController | null>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 監聽輸入框變化，搜尋地點（使用 Debounce + AbortController）
  useEffect(() => {
    if (searchQuery.length < 2) {
      setLocations([]);
      return;
    }

    // **清除舊的 debounce 計時器**
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      // **取消之前的 API 請求**
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      const fetchLocations = async () => {
        try {
          const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery}&count=10&language=en&format=json`,
            { signal: controller.signal }
          );

          if (!response.ok) throw new Error("地點搜尋失敗");

          const data = await response.json();
          setLocations(data.results || []);
          setShowSuggestions(true);
        } catch (error) {
          if (error instanceof Error) {
            if (error.name === "AbortError") {
              console.log("API 請求被中止");
            } else {
              console.error("搜尋地點時發生錯誤:", error.message);
            }
          } else {
            console.error("未知錯誤:", error);
          }
        }
      };

      fetchLocations();
    }, 300); // **300ms Debounce**

    // **清理函數**
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  return (
    <Container>
      <InputWrapper>
        <Input
          ref={inputRef}
          type="text"
          placeholder="請輸入城市名稱 ex: Taipei"
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
              {location.name}, {location.country} ({location.latitude},{" "}
              {location.longitude})
            </Li>
          ))}
        </Ul>
      )}
    </Container>
  );
};

export default SearchLocation;
