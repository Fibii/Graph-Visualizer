import React from 'react'


const NodeForm = ({ handleAddNewNode, handleClearButton, handleWithWeights }) => (
  <div className="itemContainer">
    <form onSubmit={handleAddNewNode}>
      <textarea name="nodes" className="item" id="textArea" rows="16" />

      <div id="inputItem">
        with weights 
        <input type="checkbox" onChange={handleWithWeights} />
      </div>

      <button type="submit" className="item">Add</button>
    </form>
    <button type="button" onClick={handleClearButton} className="item">clear</button>
  </div>
)

export default NodeForm
