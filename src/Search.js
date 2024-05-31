// src/Search.js
import React, { useState } from 'react';

const Search = ({ onSearch, results }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let matches = onSearch(query);
    console.log("YOOO", results);
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Search for Molecular Structures</h2>
      <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
        <div className="mb-4">
          <input
            type="text"
            id="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Type a description..."
          />
        </div>
        <div className="mt-auto mb-4">
          <button type="submit" className="w-full px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400">
            Search
          </button>
        </div>
      </form>
      <div>
        {results.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">Search Results:</h3>
            <ul>
              {results.map(result => (
                <li key={result.id} className="mb-2">
                  <div className="p-2 border rounded bg-white shadow">
                    <h4 className="font-bold">{result.id}</h4>
                    <p>Score: {result.score}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
