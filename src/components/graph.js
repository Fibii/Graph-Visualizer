import React, {useState} from 'react';
import GraphScene from './graphScene'

const nodes = [
  {
    data: {
      id: 'A'
    }
  },
  {
    data:{
      id:'B'
    }
  }

]

const Graph = () => {

  const [elements, setElements] = useState(nodes)
  const [nodeTitle, setNodeTitle] = useState('')


  const addNode = (title) => {

    if(!title){
      alert("title can't be empty")
      return
    }

    const newNode = {
      data : {
        id: title
      }
    }
    setElements(elements.concat(newNode))
  }


  const handleNodeTitleInputChange = (event) => {
    setNodeTitle(event.target.value)
  }


  console.log(elements)
  return (
      <div className='container'>

        <div classNam='item'>
          <GraphScene elements={elements} />
        </div>

        <div className='item'>
          <input type='text' onChange={handleNodeTitleInputChange} className='item'></input>
          <button onClick={() => addNode(nodeTitle)} className='item'>Add</button>
        </div>
      </div>
  )


}

export default Graph