import React, { useState, useEffect } from "react";

const Station = ({ fetchStation, fetchStationData, id }) => {
  const [station, setStation] = useState({});
  const [stationData, setStationData] = useState({});

  useEffect(() => {
    const fetchAndSetStation = async () => {
      try {
        const response = await fetchStation(id);
        console.log("response from fetchStation", response);
        setStation(response);
      } catch (error) {
        console.error("Failed to fetch Station", error.message);
      }
    };

    const fetchAndSetStationData = async () => {
      try {
        const response = await fetchStationData(id);
        console.log("response from fetchStationData", response);
        setStationData(response);
      } catch (error) {
        console.error("Failed to fetch Station data", error.message);
      }
    };

    fetchAndSetStation();
    fetchAndSetStationData();
  }, [fetchStation, fetchStationData, id]);

  return (
    <div>
      <h2>Station</h2>
      {station && (
        <div>
          <div>Station ID: {station.id}</div>
          <div>Station name: {station.nimi}</div>
          <div>Station address: {station.osoite}</div>
        </div>
      )}
      {stationData && (
        <div>
          <div>Trips begun: {stationData.trips_begun}</div>
          <div>Trips ended: {stationData.trips_ended}</div>
        </div>
      )}
    </div>
  );
};
export default Station;
