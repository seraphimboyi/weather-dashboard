<div align="center" >
  <img src="https://raw.githubusercontent.com/seraphimboyi/weather-dashboard/0813eadff540e99f8e486eeb66b7a79ade3e9aae/public/weather-logo.svg" width="200" alt="Weather Dashboard LOGO" />
</div>
<h1 align="center">Weather Dashboard | 天氣預測</h1>
<div align="center" >
<a href="https://weather-dashboard-three-sandy.vercel.app/" >專案網址</a >
<span>|</span>
<a href="https://pricey-avatar-d49.notion.site/1a77e916979080be8980def73c2dfe51?pvs=73" >專案Notion文件</a >
</div>

## 功能介紹
    
- 使用者可透過在搜尋框輸入對應城市名稱，快速搜尋到當前及未來5天的天氣資訊。
- 使用者可透過將城市加入最愛，並在最愛列表點擊城市名稱快速查詢天氣資訊。
- 也有提供攝氏/華氏的溫度顯示可供使用者作切換。




## 🚀 快速開始 (Getting Started)

複製專案

```bash
  git clone https://github.com/seraphimboyi/weather-dashboard.git
```

進入專案

```bash
  cd weather-dashboard
```

安裝套件

```bash
  npm install
  
  # 若使用 yarn
  yarn install
```

啟動專案

```bash
  npm run dev
```

---

## 📂 資料夾結構 (Project Structure)
- `public/` - 靜態資源 (e.g. 圖片, favicon)
- `src/` - 主要的 React 程式碼
- `components/` - 可重用的 UI 元件
- `hooks/` - 可重用的 Hook
- `styles/` - 全局樣式與主題設定
- `types/` - TypeScript 型別定義
- `__tests__/` - 測試相關檔案

```
.
├── public/
├── src/
│   ├── __tests__/
│   ├── components/
│   │   ├── DashBoard/
│   │   ├── Layout/
│   │   ├── Loading/
│   ├── hooks/
│   ├── styles/
│   ├── types/
│   ├── App.tsx
│   ├── main.tsx
│   ├── vite-env.d.ts
├── .gitignore
├── babel.config.cjs
├── eslint.config.js
├── index.html
├── jest.config.cjs
├── jest.setup.js
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts

```

## 🎯 關注點分離 (Separation of Concerns)

專案中的元件架構以 `三件套` 為核心，將 UI、樣式、邏輯資料拆分，以提升可讀性與維護性。

每個元件包含：
- `index.tsx` - 元件的主邏輯與 JSX 結構
- `styled.tsx` - 使用 `styled-components` 管理樣式
- `data.ts` - 元件內的靜態資料或假資料

### 📌 範例：
```
└── Component/
    ├── index.tsx 
    ├── styled.tsx 
    └── data.ts
```

---

<h2 align="center">🔧 前端技術</h2>

<div align="center">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img alt="vite" src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img alt="styled-components" src="https://img.shields.io/badge/styled--components-db7093?style=for-the-badge&logo=styled-components&logoColor=white" />
  <img alt="ESLINT" src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white" />
  <img alt="postman" src="https://img.shields.io/badge/postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" />
  <img alt="Vercel" src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
  <img alt="Jest" src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" />
</div>

> **JavaScript 框架與工具:**

- **TypeScript**
- **React.js**
- **Vite.js**

> **樣式管理:**

- **styled-components**

> **其他工具:**

- **ESLint**
- **Postman**
- **Vercel (部署)**
- **Jest (測試)**

