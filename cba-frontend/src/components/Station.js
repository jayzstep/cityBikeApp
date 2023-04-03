import React, { useState, useEffect } from "react";

const Station = ({ fetchStation, id }) => {
  const [station, setStation] = useState({});

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetchStation(id);
        setStation(response);
      } catch (error) {
        console.error("Failed to fetch Station", error.message);
      }
    };

    fetch();
  }, [fetchStation, id]);

  return (
    <div>
      <h2>Station</h2>
      <div>Station ID: {station.id}</div>
      <div>Station name: {station.nimi}</div>
      <div>Station address: {station.osoite}</div>
    </div>
  );
};

export default Station;
