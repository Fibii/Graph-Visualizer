export const isNumber = (number) => number % 1 === 0

export const isInputParsable = (lines, withWeights = false) => {
  let parsable = true

  lines.split('\n').forEach((line) => {
    const splitedLine = line.trim().split(' ')


    // each line must have length 2 or 3
    if (splitedLine.length < 2 || splitedLine.length > 3) {
      parsable = false
    }

    if (withWeights && splitedLine.length !== 3) {
      parsable = false
    }

    if (!withWeights && splitedLine.length !== 2) {
      parsable = false
    }


    if (splitedLine[0].length < 1 || splitedLine[1] === undefined || splitedLine[1].length < 1) {
      parsable = false
    }

    if (splitedLine.length === 3 && !isNumber(splitedLine[2])) {
      parsable = false
    }
  })
  return parsable
}


/**
     * format: in each line:
     * first input: source node id,
     * second input: target node id,
     * third input: weight
     * */
const getNodesToAddList = (content, withWeights = false) => {
  if (content.length === 0 || !isInputParsable(content, withWeights)) {
    return 'input error'
  }

  const lines = content.trim().split('\n')
  const nodesToAdd = []

  if (withWeights) {
    lines.forEach((line) => {
      const nodes = line.split(' ')


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
            weight: Number(nodes[2]),
          },
        },
      ]

      newNodes.forEach((node) => {
        nodesToAdd.push(node)
      })
    })
  } else {
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
  }
  return nodesToAdd
}

export default getNodesToAddList
