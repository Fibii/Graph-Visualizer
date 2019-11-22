import React, {useState, useEffect, useRef} from 'react';
import cytoscape from 'cytoscape';
import './index.css'

const nodes = [
  {
    data: {
      id: 'A'
    }
  },
  {
    data:{
      id:'B'
    }
  }

];

function App() {
  const [cy, setCy] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    console.log(containerRef);
    const cy = cytoscape({
      container: containerRef.current, // container to render in

      elements: nodes
    });

  });


  return (
      <div>
        <h1>hello</h1>
        <div ref={containerRef} id='cy'></div>
      </div>
  );
}

export default App;
