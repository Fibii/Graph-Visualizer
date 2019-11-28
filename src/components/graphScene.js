import React, { useEffect, useRef, useState } from 'react'
import cytoscape from 'cytoscape'
import LayoutList from './layoutList'
import getLayout from '../utils/graphLayouts'


const GraphScene = ({ elements }) => {
  const containerRef = useRef(null)
  const [cy, setCy] = useState(null)
  const [layout, setLayout] = useState(null)

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

    if (layout !== null) {
      cy.layout(layout).run()
    }

    setCy(cy)
  }, [elements, layout])

  const handleLayoutOnSelect = (event) => {
    const { value } = event.target
    const layout = getLayout(value)
    if (layout) {
      console.log("yete")
      setLayout(layout)
    }
  }

  return (
    <div>
      <div ref={containerRef} id="cy" />
      <LayoutList handleOnSelect={handleLayoutOnSelect} />
    </div>
  )
}

export default GraphScene
