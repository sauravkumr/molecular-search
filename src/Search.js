// src/Search.js
import React, { useState } from 'react';

const Search = ({ onSearch, results }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const [showDescriptions, setShowDescriptions] = useState({});

  const toggleDescription = (id) => {
    setShowDescriptions(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gray-100 text-gray-900">
      <div className="w-full max-w-4xl bg-white p-8 rounded-md shadow-md">
        <h2 className="text-4xl font-semibold mb-6 text-center text-blue-500">Molecule Semantic Search</h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center mb-6">
          <div className="w-full mb-4">
            <input
              type="text"
              id="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900 placeholder-gray-400 rounded-md"
              placeholder="Search for molecular structures..."
            />
          </div>
          <div className="w-full">
            <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md">
              Search
            </button>
          </div>
        </form>
        {results.length > 0 && (
          <div className="mt-6">
            <h3 className="text-2xl font-semibold mb-4 text-blue-500">Search Results:</h3>
            <ul>
              {results.map(result => (
                <li key={result.id} className="mb-6">
                  <div className="p-4 border border-gray-300 bg-gray-50 shadow-sm rounded-md">
                    <h4 className="text-xl font-semibold text-blue-500">
                      <a href={result.link || 'https://www.google.com'} target="_blank" rel="noopener noreferrer">
                        {result.id}
                      </a>
                    </h4>
                    <div className={`text-sm text-gray-700 mb-2 ${showDescriptions[result.id] ? 'block' : 'hidden'}`}>
                      {result.description || 'This is a test description'}
                    </div>
                    <div className="flex justify-between">
                      <button
                        onClick={() => toggleDescription(result.id)}
                        className="text-blue-600 underline hover:text-blue-700 focus:outline-none"
                      >
                        {showDescriptions[result.id] ? 'See less' : 'See more'}
                      </button>
                      <div>
                        {result.link && (
                          <a href={result.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-700 mr-4">
                            View on PubChem
                          </a>
                        )}
                        <a href={`https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(result.id)}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-700">
                          View on PubMed
                        </a>
                      </div>
                    </div>
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
