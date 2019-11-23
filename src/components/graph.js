import React, {useState} from 'react';
import GraphScene from './graphScene'
import NodeForm from './nodeForm'

const nodes = [
  {
    data: {
      id: 'A'
    }
  },
  {
    data: {
      id: 'B'
    }
  }

]

const Graph = () => {

  const [elements, setElements] = useState(nodes)
  const [withWeights, setWithWeights] = useState(false)


  const addNodes = (content) => {

    /**
     * format: in each line: first input: source node id, second input: target node id, third input: weight
     * */
    if (content.length === 0) {
      alert("title can't be empty")
      return
    }

    const lines = content.split('\n')
    

    if (withWeights) {

      const nodesToAdd = []

      lines.map(line => {

        const nodes = line.split(' ')

        if (nodes[0] && nodes[1] && !isNaN(nodes[2])) {
          console.log('we here')
          const newNodes = [
            {
              group: 'nodes',
              data: {
                id: nodes[0],
                weight: Number(nodes[2])
              }
            },
            {
              group: 'nodes',
              data: {
                id: nodes[1],
                weight: Number(nodes[2])
              }
            },
            {
              group: 'edges',
              data: {
                id: nodes[0] + nodes[1],
                source: nodes[0],
                target: nodes[1],
                weight: nodes[2]
              }
            }
          ]

          newNodes.map(node => {
            nodesToAdd.push(node)
          })
        }
      })

      setElements(elements.concat(nodesToAdd))

    } else {

      const nodesToAdd = []

      lines.map(line => {
        const nodes = line.split(' ')

        const newNodes = [
          {
            group: 'nodes',
            data: {
              id: nodes[0]
            }
          },
          {
            group: 'nodes',
            data: {
              id: nodes[1]
            }
          },
          {
            group: 'edges',
            data: {
              id: nodes[0] + nodes[1],
              source: nodes[0],
              target: nodes[1]
            }
          }
        ]


        newNodes.map(node => {
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
      <div className='container'>
        <GraphScene elements={elements}/>
        <NodeForm handleAddNewNode={handleAddNewNode}
                  handleClearButton={handleClearButton}
                  handleWithWeights={handleWithWeights}
        />
      </div>
  )


}

export default Graph