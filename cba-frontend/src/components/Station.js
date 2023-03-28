import React, { useState, useEffect } from "react";

const Station = ({ fetchAsema }) => {
  const [station, setStation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetchAsema(1);
        setStation(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [fetchAsema]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Station</h2>
      <div>Station ID: {station.id}</div>
      <div>Station name: {station.nimi}</div>
    </div>
  );
};

export default Station;
