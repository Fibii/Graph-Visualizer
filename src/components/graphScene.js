import React, { useEffect, useRef, useState } from 'react'
import cytoscape from 'cytoscape'
import dagre from 'cytoscape-dagre'
import GraphOptions from './graphOptions'
import getLayout from '../utils/graphLayouts'

const ZOOM_FACTOR = 0.1

const GraphScene = ({ elements }) => {
  const containerRef = useRef(null)
  const [cy, setCy] = useState(null)
  const [layout, setLayout] = useState(null)
  const [zoom, setZoom] = useState({})
  const [isDirect, setIsDirect] = useState(false)

  useEffect(() => {
    cytoscape.use(dagre)
    console.log('rendered')
    let style = {
      content: 'data(weight)',
      width: 3,
      'line-color': 'rgb(220, 183, 253)',
      'target-arrow-color': 'rgb(125, 54, 187)',
      'target-arrow-shape': 'triangle',
    }

    if (isDirect) {
      console.log('we here')
      style = {
        ...style,
        'curve-style': 'bezier',
      }
    }

    console.log(style)

    const cy = cytoscape({
      container: containerRef.current, // container to render in
      elements,

      style: [ // the stylesheet for the graph
        {
          selector: 'node',
          style: {
            'background-color': 'rgb(125, 54, 187)',
            label: 'data(id)',
          },
        },

        {
          selector: 'edge',
          style,
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

    if (zoom.level) {
      cy.zoom(zoom)
    }

    setCy(cy)
  }, [elements, layout, zoom, isDirect])

  const handleOnSelectLayout = (event) => {
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

  const handleOnSelectGraphType = (event) => {
    const { value } = event.target
    if (value === 'directed') {
      setIsDirect(true)
      console.log('yeet')
    } else {
      setIsDirect(false)
    }
  }

  return (
    <div id="graphScene">
      <GraphOptions
        handleOnSelectLayout={handleOnSelectLayout}
        handleZoomMinus={handleZoomMinus}
        handleZoomPlus={handleZoomPlus}
        handleOnSelectGraphType={handleOnSelectGraphType}
      />

      <div ref={containerRef} id="cy" />
    </div>
  )
}

export default GraphScene
