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


  const handleAddNewNode = (event) => {
    event.preventDefault()
    const title = event.target.nodeTitle.value
    addNode(title)
  }


  return (
      <div className='container'>

        <div classNam='item'>
          <GraphScene elements={elements} />
        </div>

        <div className='item'>

          <form onSubmit={handleAddNewNode}>
            <input type='text' name='nodeTitle' className='item'></input>
            <button className='item'>Add</button>
          </form>

        </div>
      </div>
  )


}

export default Graph