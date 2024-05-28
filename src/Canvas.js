// src/Canvas.js
import React, { useRef, useEffect } from 'react';
import { ForceGraph3D } from 'react-force-graph';

const Canvas = ({ graphData }) => {
  const fgRef = useRef();

  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.d3Force('link').distance(100);
    }
  }, [graphData]);

  return (
    <div className="flex-grow h-screen bg-white border-l">
      <ForceGraph3D
        ref={fgRef}
        graphData={graphData}
        nodeAutoColorBy="group"
        linkDirectionalParticles={4}
        linkDirectionalParticleSpeed={d => d.value * 0.001}
        linkDirectionalArrowColor={() => 'gray'}
        backgroundColor="#FFF"
        linkDirectionalParticleWidth={0.5}
        linkDirectionalArrowLength={5}
        // linkOpacity={0.6}
      />
    </div>
  );
};

export default Canvas;
