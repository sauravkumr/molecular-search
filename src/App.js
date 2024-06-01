// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Search from './Search';
import About from './About';

const App = () => {
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

      return matches;
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <Router>
      <div>
        <nav className="bg-gray-800 p-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Search</Link>
            </li>
            <li>
              <Link to="/graph" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Graph</Link>
            </li>
            <li>
              <Link to="/about" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">About</Link>
            </li>
          </ul>
        </nav>


        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Search onSearch={handleSearch} results={results} />} />
          <Route path="/graph" element={<iframe src="https://atlas.nomic.ai/data/epicsaurav/curious-hamilton/map" title="Wikipedia" className="w-full h-screen border-0" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;