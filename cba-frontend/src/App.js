import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import axios from "axios";
import asematService from "./services/asemat";

import Table from "./components/Table";

const fetchData = async (page, limit) => {
  try {
    const response = await axios.get("http://localhost:3001/api/asemat", {
      params: {
        page,
        limit,
      },
    });
    console.log("hei vaan frontendistä", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch data", error.message);
    throw error;
  }
};

function App() {
  const [pageCount, setPageCount] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <h1>Hello World</h1>
      <Table fetchData={fetchData} />
    </div>
  );
}

export default App;
