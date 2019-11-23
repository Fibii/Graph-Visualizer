import React from 'react'


const NodeForm = ({ handleAddNewNode, handleClearButton, handleWithWeights }) => (
  <div className="item">
    <form onSubmit={handleAddNewNode}>
      <textarea name="nodes" className="item" />
            with weights
      <input type="checkbox" onChange={handleWithWeights} />
      <input type="submit" className="item" value="Add" />
    </form>
    <button type="button" onClick={handleClearButton}>clear</button>
  </div>
)

export default NodeForm
