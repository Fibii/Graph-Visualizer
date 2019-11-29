import React from 'react'

const GraphOptions = ({
  handleOnSelectLayout, handleZoomPlus, handleZoomMinus, handleOnSelectGraphType,
}) => (
  <div id="graphOptionsContainer">

    <div id="selects">
      <span>label</span>
      <select onChange={handleOnSelectLayout}>
        <option value="default">Default</option>
        <option value="grid">Grid</option>
        <option value="random">Random</option>
        <option value="circle">Circle</option>
        <option value="concentric">Concentric</option>
        <option value="cose">Cose</option>
        <option value="dagre">Tree</option>
      </select>

      <select onChange={handleOnSelectGraphType}>
        <option value="undirected">Undirected</option>
        <option value="directed">Directed</option>
      </select>
    </div>

    <div id="zoomButtons">
      <button type="button" onClick={handleZoomPlus}>+</button>
      <button type="button" onClick={handleZoomMinus}>-</button>
    </div>

  </div>
)

export default GraphOptions
