import React from "react";
import axios from "axios";

import Table from "./components/Table";
import Station from "./components/Station";

const fetchData = async (page, limit, order, table) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/${table}`, {
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

const fetchAsema = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/asemat/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Station", error.message);
    throw error;
  }
};

function App() {
  return (
    <div>
      <Table fetchData={fetchData} table='matkat' header='Matkat' />
      <Table fetchData={fetchData} table='asemat' header='Asemat' />
      <Station fetchAsema={fetchAsema} />
    </div>
  );
}

export default App;
