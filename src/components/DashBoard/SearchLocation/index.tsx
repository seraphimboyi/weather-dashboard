import React, { useEffect, useRef, useState } from "react";
import { type LocationResult } from "../../../types/weatherApi";
import { useDebouncedFetch } from "../../../hooks/useDebouncedFetch";
import { Container, InputWrapper, Input, Ul, Li, ErrorMessage } from "./styled";

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
  const [noResults, setNoResults] = useState<boolean>(false);
  const [inputError, setInputError] = useState<string>("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  // **檢查輸入是否包含中文，並顯示錯誤提示**
  useEffect(() => {
    if (/[\u4e00-\u9fa5]/.test(searchQuery)) {
      setInputError("請使用英文輸入");
    } else {
      setInputError("");
    }
  }, [searchQuery]);

  useDebouncedFetch(
    async (controller) => {
      if (searchQuery.length < 2 || inputError) {
        setLocations([]);
        setNoResults(false);
        return;
      }

      try {
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery}&count=10&language=en&format=json`,
          { signal: controller.signal }
        );

        if (!response.ok) throw new Error("地點搜尋失敗");

        const data = await response.json();

        // **如果 API 回傳的 `results` 為空，顯示「找不到城市」**
        if (!data.results || data.results.length === 0) {
          setNoResults(true);
          setLocations([]);
        } else {
          setNoResults(false);
          setLocations(data.results);
        }

        setShowSuggestions(true);
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === "AbortError") {
            console.log("API 請求被中止");
          } else {
            console.error("搜尋地點時發生錯誤:", error.message);
            setNoResults(true); // **API 失敗時仍然顯示「找不到城市」**
          }
        } else {
          console.error("未知錯誤:", error);
          setNoResults(true);
        }
      }
    },
    300, // 🔹 Debounce 延遲 300ms
    [searchQuery, inputError] // 依賴變數
  );

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

      {/*  顯示輸入錯誤提示 */}
      {inputError && <ErrorMessage>{inputError}</ErrorMessage>}

      {/*  API 無匹配結果時顯示 */}
      {noResults && !inputError && <ErrorMessage> 查無符合的城市</ErrorMessage>}

      {/*  搜尋結果列表 */}
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
