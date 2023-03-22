import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useTable, usePagination, useExpanded, useSortBy } from "react-table";
import ClockLoader from "react-spinners/ClockLoader";

const TableComponent = ({
  columns,
  data,
  getData,
  pageCount: controlledPageCount,
  loading,
  isPaginated = true,
  ...props
}) => {
  const defaultColumn = useMemo(
    () => ({
      // minWidth: 20,
      // maxWidth: 115
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 0, pageSize: 10 },
      manualPagination: true,
      manualSortBy: true,
      autoResetPage: false,
      pageCount: controlledPageCount,
    },
    useExpanded,
    useSortBy,
    usePagination
  );

  useEffect(() => {
    getData(pageIndex, pageSize);
  }, [getData, pageIndex, pageSize]);

  return (
    <Fragment>
      {loading ? (
        <div>
          {" "}
          <ClockLoader size={100} color={"#00BFFF"} loading={loading} />
        </div>
      ) : (
        <div>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Fragment>
  );
};

export default TableComponent;
