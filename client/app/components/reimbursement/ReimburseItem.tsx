import React, { Component, SFC } from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'

export const ReimburseItem = props => {
  // const { handleItemChange, itemData } = props
  const {
    handleAddItem,
    handleItemChange,
    handleRemoveItem,
    index,
    itemData: { uid, title, type, amount, description, receipts }
  } = props
  return (
    <div id={uid} onFocus={handleAddItem} data-position={index}>
      <label htmlFor="title">title</label>
      <input
        type="text"
        name="title"
        value={title}
        onChange={handleItemChange}
      />
      <label htmlFor="type">type</label>
      <select name="type" value={type} onChange={handleItemChange}>
        <option value="lodging">lodging</option>
        <option value="travel">travel</option>
        <option value="food">food</option>
        <option value="other">other</option>
      </select>
      <label htmlFor="amount">amount</label>
      <input
        type="text"
        name="amount"
        value={amount}
        onChange={handleItemChange}
      />
      <label htmlFor="description">description</label>
      <textarea
        name="description"
        value={description}
        onChange={handleItemChange}
      />
      <label htmlFor="receipts">receipts</label>
      <input
        type="file"
        name="receipts"
        value={receipts}
        onChange={handleItemChange}
      />
      <FontAwesomeIcon
        icon="times"
        onClick={el => handleRemoveItem(uid)}
        // onClick={() => console.log('hi')}
      />
    </div>
  )
}

export default ReimburseItem
