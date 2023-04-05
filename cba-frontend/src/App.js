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
    console.log("response from app.js", response);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Station", error.message);
    throw error;
  }
};

const fetchTripsBegun = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/queries/trips_begun`,
      {
        params: {
          id,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch trips begun", error.message);
    throw error;
  }
};

const fetchTripsEnded = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/queries/trips_ended`,
      {
        params: {
          id,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch trips ended", error.message);
    throw error;
  }
};

const fetchStationData = async (id) => {
  const tripsBegun = fetchTripsBegun(id);
  const tripsEnded = fetchTripsEnded(id);

  const [begun, ended] = await Promise.all([tripsBegun, tripsEnded]);

  const tripsData = {
    trips_begun: begun[0]?.trips_begun || 0,
    trips_ended: ended[0]?.trips_ended || 0,
  };

  console.log("tripsData from app.js", tripsData);
  return tripsData;
};

function App() {
  const [stationId, setStationId] = useState(547);

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
      <Station
        fetchStation={fetchStation}
        fetchStationData={fetchStationData}
        id={stationId}
      />
    </div>
  );
}

export default App;
