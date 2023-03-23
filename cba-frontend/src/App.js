import React from "react";
import axios from "axios";

import Table from "./components/Table";

const fetchData = async (page, limit, order) => {
  try {
    const response = await axios.get("http://localhost:3001/api/matkat", {
      params: {
        page,
        limit,
        order,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch data", error.message);
    throw error;
  }
};

function App() {
  return (
    <div>
      <h1>Hello World</h1>
      <Table fetchData={fetchData} />
    </div>
  );
}

export default App;
