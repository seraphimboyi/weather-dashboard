import { useEffect, useRef } from "react";

type FetchCallback = (controller: AbortController) => Promise<void>;

export const useDebouncedFetch = (
  callback: FetchCallback,
  delay: number,
  dependencies: any[]
) => {
  const abortControllerRef = useRef<AbortController | null>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
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

      callback(controller);
    }, delay);

    // **清理函數**
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, dependencies);
};
