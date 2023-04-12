import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import "../styles/App.css";

const Table = ({ fetchData, setId, table, header }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [order, setOrder] = useState("id");
  const [headers, setHeaders] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchAndSetData = async (page, limit, order, search, table) => {
    try {
      setIsLoading(true);
      const response = await fetchData(page, limit, order, search, table);

      setTimeout(() => {
        setData(response.data);
        setTotalPages(response.totalPages);
        setIsLoading(false);
      }, 600);
    } catch (error) {
      console.error("Failed to fetch data", error.message);
    }
  };

  useEffect(() => {
    fetchAndSetData(page, 10, order, search, table);
  }, [page, order]);

  useEffect(() => {
    if (!Array.isArray(data) || data.length === 0) return;

    if (table === "matkat") {
      const filterData = () => {
        const newData = data.map((row) => ({
          departure_station_name: row.departure_station_name,
          return_station_name: row.return_station_name,
          covered_distance_m: row.covered_distance_m,
          duration_s: row.duration_s,
        }));
        setFilteredData(newData);

        if (newData.length > 0) {
          setHeaders(Object.keys(newData[0]));
        }
      };

      filterData();
    }

    if (table === "asemat") {
      const filterData = () => {
        const newData = data.map((row) => ({
          nimi: row.nimi,
          name: row.name,
          osoite: row.osoite,
          adress: row.adress,
          kaupunki: row.kaupunki,
          stad: row.stad,
          operaattor: row.operaattor,
          kapasiteet: row.kapasiteet,
        }));
        setFilteredData(newData);

        if (newData.length > 0) {
          setHeaders(Object.keys(newData[0]));
        }
      };

      filterData();
    }
  }, [data]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleOrderChange = (newOrder) => {
    setOrder(newOrder);
    setPage(1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPage(1);
    setOrder("id");
    fetchAndSetData(page, 10, order, search, table);
  };

  const handleReset = () => {
    setSearch("");
    setPage(1);
    setOrder("id");
    fetchAndSetData(page, 10, order, search, table);
  };

  const getStationId = (stationName) => {
    const stationData = data.find(
      (row) =>
        row.departure_station_name === stationName ||
        row.return_station_name === stationName ||
        row.nimi === stationName
    );

    if (!stationData) {
      return null;
    }
    if (table === "matkat") {
      return stationData.departure_station_name === stationName
        ? stationData.departure_station_id
        : stationData.return_station_id;
    }
    if (table === "asemat") {
      return stationData.nimi === stationName ? stationData.id : null;
    }
  };

  const onColumnClick = (header, row) => {
    console.log("Column/Cell clicked: ", header, row[header]);

    if (
      header === "departure_station_name" ||
      header === "return_station_name" ||
      header === "nimi"
    ) {
      setId(getStationId(row[header]));
    }
  };

  return (
    <div className='table-container'>
      <h1>{header}</h1>
      <div className='search-form-container'>
        <form className='search-form' onSubmit={handleSubmit}>
          <input
            type='text'
            value={search}
            name='Search'
            onChange={({ target }) => setSearch(target.value)}
            placeholder='Search'
          />
          <button type='submit'>Search</button>
          <button onClick={() => handleReset()}>Reset</button>
        </form>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <table className='table'>
          <thead>
            <tr>
              {filteredData.length > 0 &&
                Object.keys(filteredData[0]).map((key) => (
                  <th
                    onClick={() => {
                      handleOrderChange(key);
                    }}
                    key={key}
                  >
                    {key}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={`${table}-${data[index]?.id || index}`}>
                {headers.map((header, cellIndex) => (
                  <td
                    key={cellIndex}
                    onClick={() => onColumnClick(header, row)}
                  >
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Table;
