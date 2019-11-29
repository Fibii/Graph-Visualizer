import React from 'react'

const GraphOptions = ({ handleOnSelect, handleZoomPlus, handleZoomMinus }) => (
  <div>
    layout
    <select onChange={handleOnSelect}>
      <option value="default">Default</option>
      <option value="grid">Grid</option>
      <option value="random">Random</option>
      <option value="circle">Circle</option>
      <option value="concentric">Concentric</option>
      <option value="cose">Cose</option>
    </select>
    <button type="button" onClick={handleZoomPlus}>+</button>
    <button type="button" onClick={handleZoomMinus}>-</button>
  </div>
)

export default GraphOptions
