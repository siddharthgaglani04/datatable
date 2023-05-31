import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import './App.css'

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from an external source (e.g., CSV/JSON file)
    // Update the state with the fetched data
    fetchData().then((fetchedData) => setData(fetchedData));
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const columns = [
    { key: 'id', label: 'ID', filterable: true },
    { key: 'title', label: 'Title', filterable: true },
    { key: 'body', label: 'Body' }
  ];

  return (
    <div>
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default App;
