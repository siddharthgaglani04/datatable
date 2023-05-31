import React, { useState } from 'react';

const DataTable = ({ data, columns }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState(null);
  const [filters, setFilters] = useState({});

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Sorting
  const sortData = (column) => {
    let direction = 'asc';
    if (sortConfig && sortConfig.key === column) {
      direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    }
    setSortConfig({ key: column, direction });
  };

  // Filtering
  const filterData = (column, value) => {
    setFilters({ ...filters, [column]: value });
  };

  const filteredItems = currentItems.filter((item) =>
    Object.entries(filters).every(([column, value]) => {
      if (!value) return true;
      return item[column].toString().toLowerCase().includes(value.toLowerCase());
    })
  );

  const sortedItems = filteredItems.sort((a, b) => {
    if (!sortConfig) return 0;
    const key = sortConfig.key;
    const direction = sortConfig.direction === 'asc' ? 1 : -1;
    return a[key] > b[key] ? direction : -direction;
  });

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  
    return (
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item${currentPage === number ? ' active' : ''}`}
          >
            <button className="page-link" onClick={() => onPageChange(number)}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>
                <button onClick={() => sortData(column.key)}>
                  {column.label}
                </button>
                {column.filterable && (
                  <input
                    type="text"
                    onChange={(e) => filterData(column.key, e.target.value)}
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.key}>{item[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalItems={data.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};



export default DataTable;