import { useEffect, useRef, useState } from "react";
import { type LocationResult } from "../../../types/weatherApi";

type SearchLocationProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setLatitude: (lat: number) => void;
  setLongitude: (lon: number) => void;
};

const SearchLocation: React.FC<SearchLocationProps> = ({
  searchQuery,
  setSearchQuery,
  setLatitude,
  setLongitude,
}) => {
  const [locations, setLocations] = useState<LocationResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(true); // 控制提示列表顯示

  const inputRef = useRef<HTMLInputElement | null>(null);

  // 監聽輸入框變化，搜尋地點
  useEffect(() => {
    if (searchQuery.length < 2) {
      setLocations([]); // 清空搜尋結果
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
        setShowSuggestions(true); // 當 API 有結果時才顯示提示
      } catch (error) {
        console.error("搜尋地點時發生錯誤:", error);
      }
    };

    fetchLocations();
  }, [searchQuery]);

  return (
    <>
      <h2>搜尋地點</h2>
      <input
        ref={inputRef}
        type="text"
        placeholder="輸入城市名稱"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setShowSuggestions(true)} // 當獲取焦點時，顯示提示
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // 失去焦點後延遲隱藏，以防止點擊時立即消失
      />

      {/* 搜尋結果列表 */}
      {showSuggestions && locations.length > 0 && (
        <ul>
          {locations.map((location) => (
            <li
              key={location.id}
              onClick={() => {
                setLatitude(location.latitude);
                setLongitude(location.longitude);
                setSearchQuery("");
                setShowSuggestions(false); // 選擇後隱藏建議
                setTimeout(() => {
                  inputRef.current?.blur();
                }, 100);
              }}
            >
              {location.name}, {location.country} ({location.latitude},{" "}
              {location.longitude})
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SearchLocation;
