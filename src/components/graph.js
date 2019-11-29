import React, { useState } from 'react'
import GraphScene from './graphScene'
import NodeForm from './nodeForm'
import getNodesToAddList from '../utils/input'

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

  return (
    <div className="container">
      <GraphScene elements={elements} id="graphScene" />
      <NodeForm
        handleAddNewNode={handleAddNewNode}
        handleClearButton={handleClearButton}
        handleWithWeights={handleWithWeights}
        id="nodeForm"
      />
    </div>
  )
}

export default Graph
