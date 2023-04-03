import React, { useState, useEffect } from "react";
//Hakee väärän id:n, kun klikkaa taulukosta

const Station = ({ fetchAsema, id }) => {
  const [station, setStation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetchAsema(id);
        setStation(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [id]);

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
