import React, { useState } from 'react'
import GraphScene from './graphScene'
import NodeForm from './nodeForm'
import getNodesToAddList from '../utils/input'
import LayoutList from './layoutList'
import getLayout from '../utils/graphLayouts'

const intialNodes = [
  {
    data: {
      id: 'A',
    },
  },
  {
    data: {
      id: 'B',
    },
  },

]

const Graph = () => {
  const [elements, setElements] = useState(intialNodes)
  const [withWeights, setWithWeights] = useState(false)
  const [layout, setLayout] = useState(null)

  const addNodes = (content) => {
    const nodesToAdd = getNodesToAddList(content, withWeights)
    if (nodesToAdd === 'input error') {
      alert('input error')
    } else {
      setElements(nodesToAdd)
    }
  }


  const handleAddNewNode = (event) => {
    event.preventDefault()
    const content = event.target.nodes.value
    addNodes(content)
  }

  const handleClearButton = () => setElements([])
  const handleWithWeights = () => setWithWeights(!withWeights)

  const handleLayoutOnSelect = (event) => {
    const { value } = event.target
    const layout = getLayout(value)
    if (layout) {
      setLayout(layout)
    }
    setElements(elements.concat([]))
  }

  return (
    <div className="mainContainer">
      <GraphScene elements={elements} layout={layout} className="item" />
      <div className="container">

        <NodeForm
          handleAddNewNode={handleAddNewNode}
          handleClearButton={handleClearButton}
          handleWithWeights={handleWithWeights}
          className="item"
        />
        <LayoutList handleOnSelect={handleLayoutOnSelect} />


      </div>
    </div>
  )
}

export default Graph
