import React, {useEffect, useRef} from 'react';
import cytoscape from 'cytoscape';




const GraphScene = ({elements}) => {

  const containerRef = useRef(null)

  useEffect(() => {
    const cy = cytoscape({
      container: containerRef.current, // container to render in
      elements,

      style: [ // the stylesheet for the graph
      {
        selector: 'node',
        style: {
          'background-color': '#666',
          'label': 'data(id)'
        }
      },

      {
        selector: 'edge',
        style: {
          'width': 3,
          'length': 10,
          'line-color': '#ccc',
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'triangle'
          }
        }
      ],

      layout: {
        name: 'grid',
        rows: 1
      }

    })

  })



  return (
      <div ref={containerRef} id='cy'>
      </div>
  )
}

export default GraphScene;