import React from "react";
import DashBoard from "./components/DashBoard";
import Layout from "./components/Layout";

const App: React.FC = () => {
  return (
    <Layout>
      <DashBoard />
    </Layout>
  );
};

export default App;
