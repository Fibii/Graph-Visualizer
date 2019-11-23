import React, { useState } from 'react'
import GraphScene from './graphScene'
import NodeForm from './nodeForm'

const nodes = [
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
  const [elements, setElements] = useState(nodes)
  const [withWeights, setWithWeights] = useState(false)


  const isInputParsable = (lines) => {
    let parsable = true
    lines.split('\n').forEach((line) => {
      const splitedLine = line.split(' ')

      // each line must have length 2 or 3
      console.log('splited lined', splitedLine.length)
      if (splitedLine.length < 2 || splitedLine.length > 3) {
        parsable = false
      }

      // todo: use some other function instead of NaN
      if (splitedLine.length === 3 && isNaN(splitedLine[2])) {
        parsable = false
      }
    })
    return parsable
  }

  const addNodes = (content) => {
    /**
     * format: in each line:
     * first input: source node id,
     * second input: target node id,
     * third input: weight
     * */
    if (content.length === 0 || !isInputParsable(content)) {
      alert('input error')
      return
    }

    const lines = content.split('\n')


    if (withWeights) {
      const nodesToAdd = []

      lines.forEach((line) => {
        const nodes = line.split(' ')

        if (nodes[0] && nodes[1]) {
          const newNodes = [
            {
              group: 'nodes',
              data: {
                id: nodes[0],
                weight: Number(nodes[2]),
              },
            },
            {
              group: 'nodes',
              data: {
                id: nodes[1],
                weight: Number(nodes[2]),
              },
            },
            {
              group: 'edges',
              data: {
                id: nodes[0] + nodes[1],
                source: nodes[0],
                target: nodes[1],
                weight: nodes[2],
              },
            },
          ]

          newNodes.forEach((node) => {
            nodesToAdd.push(node)
          })
        }
      })

      setElements(elements.concat(nodesToAdd))
    } else {
      const nodesToAdd = []

      lines.forEach((line) => {
        const nodes = line.split(' ')

        const newNodes = [
          {
            group: 'nodes',
            data: {
              id: nodes[0],
            },
          },
          {
            group: 'nodes',
            data: {
              id: nodes[1],
            },
          },
          {
            group: 'edges',
            data: {
              id: nodes[0] + nodes[1],
              source: nodes[0],
              target: nodes[1],
            },
          },
        ]

        newNodes.forEach((node) => {
          nodesToAdd.push(node)
        })
      })

      setElements(elements.concat(nodesToAdd))
    }
  }


  const handleAddNewNode = (event) => {
    console.log('withWeights', withWeights)
    event.preventDefault()
    const content = event.target.nodes.value
    addNodes(content)
  }

  const handleClearButton = () => setElements([])
  const handleWithWeights = () => setWithWeights(!withWeights)

  return (
    <div className="container">
      <GraphScene elements={elements} />
      <NodeForm
        handleAddNewNode={handleAddNewNode}
        handleClearButton={handleClearButton}
        handleWithWeights={handleWithWeights}
      />
    </div>
  )
}

export default Graph
