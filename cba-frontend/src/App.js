import React, { useState } from "react";
import axios from "axios";

import Table from "./components/Table";
import Station from "./components/Station";

const fetchData = async (page, limit, order, search, table) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/${table}`, {
      params: {
        page,
        limit,
        order,
        search,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch data", error.message);
    throw error;
  }
};

const fetchStation = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/asemat/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Station", error.message);
    throw error;
  }
};

function App() {
  const [stationId, setStationId] = useState(1);

  const setId = (id) => {
    setStationId(id);
  };

  return (
    <div>
      <Table
        fetchData={fetchData}
        setId={setId}
        table='matkat'
        header='Matkat'
      />
      <Table
        fetchData={fetchData}
        setId={setId}
        table='asemat'
        header='Asemat'
      />
      <Station fetchStation={fetchStation} id={stationId} />
    </div>
  );
}

export default App;
