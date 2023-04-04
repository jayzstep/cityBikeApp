import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import "../styles/App.css";

const Table = ({ fetchData, setId, table, header }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [order, setOrder] = useState("id");
  const [headers, setHeaders] = useState([]);
  const [search, setSearch] = useState("");

  const fetchAndSetData = async (page, limit, order, search, table) => {
    try {
      const response = await fetchData(page, limit, order, search, table);
      setData(response.data);
      setTotalPages(response.totalPages);
      setHeaders(Object.keys(response.data[0]));
    } catch (error) {
      console.error("Failed to fetch data", error.message);
    }
  };

  useEffect(() => {
    fetchAndSetData(page, 10, order, search, table);
  }, [page, order]);

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

  const onColumnClick = (header, row) => {
    console.log("Column/Cell clicked: ", header, row[header]);

    if (
      header === "departure_station_name" ||
      header === "departure_station_id"
    ) {
      setId(row["departure_station_id"]);
    }

    if (header === "return_station_name" || header === "return_station_id") {
      setId(row["return_station_id"]);
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
            {data.length > 0 &&
              Object.keys(data[0]).map((key) => (
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
          {data.map((row) => (
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
