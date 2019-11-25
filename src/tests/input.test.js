import getNodesToAddList, { isNumber, isInputParsable } from '../utils/input'

describe('input parsing functions', () => {
  test('isNumber returns true for numbers only', () => {
    expect(isNumber('123')).toBe(true)
    expect(isNumber('-123')).toBe(true)
    expect(isNumber('0')).toBe(true)
    expect(isNumber('0xff')).toBe(true)
    expect(isNumber('D')).toBe(false)
    expect(isNumber('3D')).toBe(false)
    expect(isNumber('[1]')).toBe(false)
  })

  test('correct input can be parsed', () => {
    expect(isInputParsable('A B 5', true)).toBe(true)
    expect(isInputParsable('A B 5\nA C 4', true)).toBe(true)
    expect(isInputParsable('A B ')).toBe(true)
    expect(isInputParsable('A B 1 ', true)).toBe(true)
  })

  test('wrong input cannot be parsed', () => {
    expect(isInputParsable(' ')).toBe(false)
    expect(isInputParsable('A B C', true)).toBe(false)
    expect(isInputParsable('A B 5\nA C D', true)).toBe(false)
  })
})


describe('input to object list function works', () => {
  test('getNodeToAdd with one line without weights works', () => {
    const basicInput = 'A B'

    const basicObjects = [
      {
        group: 'nodes',
        data: {
          id: 'A',
        },
      },
      {
        group: 'nodes',
        data: {
          id: 'B',
        },
      },
      {
        group: 'edges',
        data: {
          id: 'AB',
          source: 'A',
          target: 'B',
        },
      },
    ]

    const nodesToAdd = getNodesToAddList(basicInput)
    expect(nodesToAdd).toEqual(basicObjects)
  })


  test('getNodeToAdd with three lines without weights works', () => {
    const input = 'A B \nA C\nA D'

    const objects = [
      {
        group: 'nodes',
        data: {
          id: 'A',
        },
      },
      {
        group: 'nodes',
        data: {
          id: 'B',
        },
      },
      {
        group: 'edges',
        data: {
          id: 'AB',
          source: 'A',
          target: 'B',
        },
      },
      {
        group: 'nodes',
        data: {
          id: 'A',
        },
      },
      {
        group: 'nodes',
        data: {
          id: 'C',
        },
      },
      {
        group: 'edges',
        data: {
          id: 'AC',
          source: 'A',
          target: 'C',
        },
      },
      {
        group: 'nodes',
        data: {
          id: 'A',
        },
      },
      {
        group: 'nodes',
        data: {
          id: 'D',
        },
      },
      {
        group: 'edges',
        data: {
          id: 'AD',
          source: 'A',
          target: 'D',
        },
      },
    ]


    const nodesToAdd = getNodesToAddList(input)
    objects.sort()
    nodesToAdd.sort()
    expect(nodesToAdd).toEqual(objects)
  })

  test('getNodeToAdd with one line with weights works', () => {
    const basicInput = 'A B 5'

    const basicObjects = [
      {
        group: 'nodes',
        data: {
          id: 'A',
          weight: 5,
        },
      },
      {
        group: 'nodes',
        data: {
          id: 'B',
          weight: 5,
        },
      },
      {
        group: 'edges',
        data: {
          id: 'AB',
          source: 'A',
          target: 'B',
          weight: 5,
        },
      },
    ]

    const nodesToAdd = getNodesToAddList(basicInput, true)
    expect(nodesToAdd).toEqual(basicObjects)
  })


  test('getNodeToAdd with three lines with weights works', () => {
    const input = 'A B 4\nA C 6\nA D -14'

    const objects = [
      {
        group: 'nodes',
        data: {
          id: 'A',
          weight: 4,
        },
      },
      {
        group: 'nodes',
        data: {
          id: 'B',
          weight: 4,
        },
      },
      {
        group: 'edges',
        data: {
          id: 'AB',
          source: 'A',
          target: 'B',
          weight: 4,
        },
      },
      {
        group: 'nodes',
        data: {
          id: 'A',
          weight: 6,
        },
      },
      {
        group: 'nodes',
        data: {
          id: 'C',
          weight: 6,
        },
      },
      {
        group: 'edges',
        data: {
          id: 'AC',
          source: 'A',
          target: 'C',
          weight: 6,
        },
      },
      {
        group: 'nodes',
        data: {
          id: 'A',
          weight: -14,
        },
      },
      {
        group: 'nodes',
        data: {
          id: 'D',
          weight: -14,
        },
      },
      {
        group: 'edges',
        data: {
          id: 'AD',
          source: 'A',
          target: 'D',
          weight: -14,
        },
      },
    ]


    const nodesToAdd = getNodesToAddList(input, true)
    objects.sort()
    nodesToAdd.sort()
    expect(nodesToAdd).toEqual(objects)
  })
})


describe('input to object list function fails', () => {
  test('getNodeToAdd with empty line without weights fails', () => {
    const basicInput = ''
    const nodesToAdd = getNodesToAddList(basicInput)
    expect(nodesToAdd).toEqual('input error')
  })

  test('getNodeToAdd with empty line with weight fails', () => {
    const basicInput = ''
    const nodesToAdd = getNodesToAddList(basicInput)
    expect(nodesToAdd).toEqual('input error')
  })

  test('getNodeToAdd with one line without weights fails', () => {
    const basicInput = 'A C K'
    const nodesToAdd = getNodesToAddList(basicInput)
    expect(nodesToAdd).toEqual('input error')
  })

  test('getNodeToAdd with one line and with weights fails', () => {
    const basicInput = 'A C K'
    const nodesToAdd = getNodesToAddList(basicInput, true)
    expect(nodesToAdd).toEqual('input error')
  })

  test('getNodeToAdd with one line with 2 with weights fails', () => {
    const basicInput = 'A C'
    const nodesToAdd = getNodesToAddList(basicInput, true)
    expect(nodesToAdd).toEqual('input error')
  })


  test('getNodeToAdd with three lines without weights fails', () => {
    const input = 'A B \nA C\nA D k'
    const nodesToAdd = getNodesToAddList(input)
    expect(nodesToAdd).toEqual('input error')
  })

  test('getNodeToAdd with three lines with weights fails', () => {
    const input = 'A B \nA C\nA D k'
    const nodesToAdd = getNodesToAddList(input, true)
    expect(nodesToAdd).toEqual('input error')
  })
})
