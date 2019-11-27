import React, { useEffect, useRef, useState } from 'react'
import cytoscape from 'cytoscape'

const GraphScene = ({ elements }) => {
  const containerRef = useRef(null)
  const [cy, setCy] = useState(null)

  useEffect(() => {
    const cy = cytoscape({
      container: containerRef.current, // container to render in
      elements,

      style: [ // the stylesheet for the graph
        {
          selector: 'node',
          style: {
            'background-color': '#666',
            label: 'data(id)',
          },
        },

        {
          selector: 'edge',
          style: {
            content: 'data(weight)',
            width: 3,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle',
          },
        },
      ],

      layout: {
        name: 'grid',
        rows: 1,
      },

    })

    setCy(cy)
  }, [elements])


  return (
    <div ref={containerRef} id="cy" />
  )
}

export default GraphScene
