// src/App.js
import React, { useState } from 'react';
import Search from './Search';
import Canvas from './Canvas';

const dummyGraphData = {
  nodes: [
    { id: '1', group: 1 },
    { id: '2', group: 1 },
    { id: '3', group: 2 },
    { id: '4', group: 2 },
  ],
  links: [
    { source: '1', target: '2', value: 1 },
    { source: '2', target: '3', value: 1 },
    { source: '3', target: '4', value: 1 },
  ],
};

function App() {
  const [graphData, setGraphData] = useState(dummyGraphData);

  const handleSearch = (query) => {
    console.log('Search query:', query);
    // Integrate with Pinecone here to fetch actual search results and update graphData
    // For now, we are using dummy data
    setGraphData(dummyGraphData);
  };

  return (
    <div className="flex">
      <div className="w-1/3">
        <Search onSearch={handleSearch} />
      </div>
      <div className="w-2/3">
        <Canvas graphData={graphData} />
      </div>
    </div>
  );
}

export default App;
