import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import asematService from "./services/asemat";

import Table from "./components/Table";

function App() {
  const [pageCount, setPageCount] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    const asemat = asematService.getAll();
    setData(asemat.data);
    setLoading(false);
  }, []);

  const columns = useMemo(() => [
    { Header: "id", accessor: "id" },
    { Header: "nimi", accessor: "nimi" },
  ]);

  return (
    <div>
      <h1>Hello World</h1>
      <Table
        pagecount={pageCount}
        columns={columns}
        loading={loading}
        data={data}
      />
    </div>
  );
}

export default App;
