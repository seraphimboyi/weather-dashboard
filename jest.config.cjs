module.exports = {
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // 讓 Jest 轉譯 JS/TS 檔案
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"], // 讓 Jest 能讀取這些副檔名
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Jest 測試環境設定
  testEnvironment: "jsdom", // 適用於 React 測試
};
