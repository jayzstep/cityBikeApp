import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import "../styles/App.css";

const Table = ({ fetchData, setId, table, header }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [order, setOrder] = useState("departure_station_name");
  const [headers, setHeaders] = useState([]);
  const [search, setSearch] = useState("");

  const fetchAndSetData = async (page, limit, order, search, table) => {
    try {
      const response = await fetchData(page, limit, order, search, table);
      setData(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Failed to fetch data", error.message);
    }
  };

  useEffect(() => {
    fetchAndSetData(page, 10, order, search, table);
  }, [page, order]);

  useEffect(() => {
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
    setOrder("departure_station_name");
    fetchAndSetData(page, 10, order, search, table);
  };

  const getStationId = (stationName) => {
    const stationData = data.find(
      (row) =>
        row.departure_station_name === stationName ||
        row.return_station_name === stationName
    );

    if (!stationData) {
      return null;
    }

    return stationData.departure_station_name === stationName
      ? stationData.departure_station_id
      : stationData.return_station_id;
  };

  const onColumnClick = (header, row) => {
    console.log("Column/Cell clicked: ", header, row[header]);

    if (
      header === "departure_station_name" ||
      header === "return_station_name"
    ) {
      setId(getStationId(row[header]));
    }
  };

  return (
    <div className='table-container'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={search}
          name='Search'
          onChange={({ target }) => setSearch(target.value)}
          placeholder='Search'
        />
        <button type='submit'>Search</button>
      </form>

      <h1>{header}</h1>
      <table className='table' key={header}>
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
          {filteredData.map((row) => (
            <tr key={row.id}>
              {headers.map((header, cellIndex) => (
                <td key={cellIndex} onClick={() => onColumnClick(header, row)}>
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Table;
