import React, { useState, useEffect } from "react";
import "../styles/App.css";

const Station = ({ fetchStation, fetchStationData, id }) => {
  const [station, setStation] = useState({});
  const [stationData, setStationData] = useState({});

  useEffect(() => {
    const fetchAndSetStation = async () => {
      try {
        const response = await fetchStation(id);

        setStation(response);
      } catch (error) {
        console.error("Failed to fetch Station", error.message);
      }
    };

    const fetchAndSetStationData = async () => {
      try {
        const response = await fetchStationData(id);

        setStationData(response);
      } catch (error) {
        console.error("Failed to fetch Station data", error.message);
      }
    };

    fetchAndSetStation();
    fetchAndSetStationData();
  }, [fetchStation, fetchStationData, id]);

  //log stationData to console:
  console.log("stationData", stationData);

  return (
    <div className='detail-container'>
      <h2>Station</h2>
      {station && (
        <dl>
          <dt>Station ID:</dt>
          <dd>{station.id}</dd>
          <dt>Station name: </dt>
          <dd>{station.nimi}</dd>
          <dt>Station address: </dt>
          <dd>{station.osoite}</dd>
        </dl>
      )}
      {stationData && (
        <dl>
          <dt>Trips begun: </dt>
          <dd>{stationData.trips_begun}</dd>
          <dt>Trips ended: </dt>
          <dd> {stationData.trips_ended}</dd>
          <dt>Average trip duration: </dt>
          <dd>{stationData.average_trip_duration}</dd>
        </dl>
      )}
    </div>
  );
};
export default Station;
