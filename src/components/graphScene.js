import React, { useEffect, useRef, useState } from 'react'
import cytoscape from 'cytoscape'
import GraphOptions from './graphOptions'
import getLayout from '../utils/graphLayouts'

const ZOOM_FACTOR = 0.1

const GraphScene = ({ elements }) => {
  const containerRef = useRef(null)
  const [cy, setCy] = useState(null)
  const [layout, setLayout] = useState(null)
  const [zoom, setZoom] = useState({})

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

    console.log(zoom)
    if (zoom.level) {
      cy.zoom(zoom)
    }

    setCy(cy)
  }, [elements, layout, zoom])

  const handleLayoutOnSelect = (event) => {
    const { value } = event.target
    const layout = getLayout(value)
    if (layout) {
      setLayout(layout)
    }
  }

  const handleZoomPlus = () => {
    setZoom({
      level: cy.zoom() + ZOOM_FACTOR,
    })
  }

  const handleZoomMinus = () => {
    setZoom({
      level: cy.zoom() - ZOOM_FACTOR,
    })
  }

  return (
    <div>
      <div ref={containerRef} id="cy" />
      <GraphOptions
        handleOnSelect={handleLayoutOnSelect}
        handleZoomMinus={handleZoomMinus}
        handleZoomPlus={handleZoomPlus}
      />
    </div>
  )
}

export default GraphScene
