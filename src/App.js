// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import Search from './Search';
import Canvas from './Canvas';

const App = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [results, setResults] = useState([]);

  const handleSearch = async (query) => {
    console.log('Search query:', query);
    try {
      // First GET request
      const response1 = await axios.get('http://127.0.0.1:5000/notsearch', {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response1);

      // POST request for search
      const response = await axios.post('http://127.0.0.1:5000/search', { query: query }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(response.data);

      // Parse response and update results
      const matches = response.data;  // Handle different response structures

      // Check if matches is an array
      if (!Array.isArray(matches)) {
        throw new Error("Expected 'matches' to be an array");
      }
      setResults(matches);
      const nodes = matches.map((result, index) => ({
        id: result.id,
        group: index % 2 === 0 ? 1 : 2,
      }));
      const links = matches.map((result, index) => ({
        source: 'query',
        target: result.id,
        value: 1,
      }));

      setGraphData({ nodes: [{ id: 'query', group: 3 }, ...nodes], links });
      return matches
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="flex">
      <div className="w-1/3">
        <Search onSearch={handleSearch} results={results} />
      </div>
      <div className="w-2/3">
        <Canvas graphData={graphData} />
      </div>
    </div>
  );
};

export default App;
