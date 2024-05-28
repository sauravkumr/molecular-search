// src/Search.js
import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      const dummyResults = [
        { id: 1, name: 'Molecule 1', description: 'Description for Molecule 1' },
        { id: 2, name: 'Molecule 2', description: 'Description for Molecule 2' },
        { id: 3, name: 'Molecule 3', description: 'Description for Molecule 3' },
      ];
      setResults(dummyResults);
      onSearch(query);
    }
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
                    <h4 className="font-bold">{result.name}</h4>
                    <p>{result.description}</p>
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
