import React from "react";


const NodeForm = ({handleAddNewNode, handleClearButton, handleWithWeights}) => {

  return (
        <div className='item'>
          <form onSubmit={handleAddNewNode}>
            <textarea name='nodes' className='item'></textarea>
            with weights<input type='checkbox' onChange={handleWithWeights}></input>
            <button className='item'>Add</button>
          </form>
          <button onClick={handleClearButton}>clear</button>
        </div>
  )
}

export default NodeForm