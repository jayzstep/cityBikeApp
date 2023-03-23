import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";

const Table = ({ fetchData }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [order, setOrder] = useState("fid");

  const fetchAndSetData = async (page, limit, order) => {
    try {
      const response = await fetchData(page, limit, order);

      setData(response.data);
      setTotalPages(response.totalPages);
      //type of response.totalPages
      console.log(typeof response.totalPages);
    } catch (error) {
      console.error("Failed to fetch data", error.message);
    }
  };

  useEffect(() => {
    fetchAndSetData(page, 10, order);
  }, [page, order]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleOrderChange = (newOrder) => {
    setOrder(newOrder);
    setPage(1);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((key) => (
                <th
                  onClick={() => {
                    handleOrderChange(key);
                  }}
                >
                  {key}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {Object.values(row).map((value) => (
                <td>{value}</td>
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
