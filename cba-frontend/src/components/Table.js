import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";

const Table = ({ fetchData }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAndSetData = async (page, limit) => {
    try {
      const response = await fetchData(page, limit);

      setData(response.data);
      setTotalPages(response.totalPages);
      //type of response.totalPages
      console.log(typeof response.totalPages);
    } catch (error) {
      console.error("Failed to fetch data", error.message);
    }
  };

  useEffect(() => {
    fetchAndSetData(page, 10);
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  console.log(typeof totalPages, totalPages);
  return (
    <div>
      <table>
        <thead>
          <tr></tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.nimi}</td>
              <td>{row.osoite}</td>
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
