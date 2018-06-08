import React, { Component, SFC } from 'react'

export class ReimburseForm extends Component {
  render() {
    return (
      <form>
        <label htmlFor="title">title</label>
        <input type="text" name="title" />

        <label htmlFor="type">type</label>
        <select name="type">
          <option value="lodging">lodging</option>
          <option value="travel">travel</option>
          <option value="food">food</option>
          <option value="other">other</option>
        </select>

        <label htmlFor="amount">amount</label>
        <input type="text" name="amount" />

        <label htmlFor="description">description</label>
        <textarea name="description" />
      </form>
    )
  }
}

export default ReimburseForm
