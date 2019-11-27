import React from 'react'

const LayoutList = ({ handleOnSelect }) => (
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

  </div>
)

export default LayoutList
