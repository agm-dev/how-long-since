import React, { Component } from 'react'
import Item from '../models/Item'

const defaultState = {
  items: [],
}

const DataContext = React.createContext(defaultState)

class DataProvider extends Component {
  constructor(props) {
    super(props)
    this.state = { ...defaultState }
  }

  componentDidMount() {
    const storedItems = JSON.parse(localStorage.getItem('items'))
    if (storedItems) {
      this.setState({ todos: storedItems })
    }
  }

  componentDidUpdate(prevState) {
    const { items } = this.state
    const prevDataString = JSON.stringify(prevState.items)
    const DataString = JSON.stringify(items)
    if (prevDataString !== DataString) {
      localStorage.setItem('items', DataString)
    }
  }

  addItem = item => {
    const { items } = this.state
    const newItem = new Item({ ...item})
    this.setState({ items: [...items, newItem] })
  }

  removeItem = item => {
    const { items } = this.state
    const match = items.find(i => i.id === item.id)
    if (match) {
      const updatedItems = items.filter(i => i.id !== item.id)
      this.setState({ items: updatedItems })
    }
  }

  render() {
    const { children } = this.props
    const { items } = this.state

    return (
      <DataContext.Provider
        value={{
          items,
          addItem: this.addItem,
          removeItem: this.removeItem,
        }}
      >
        {children}
      </DataContext.Provider>
    )
  }
}

export {
  DataContext,
  DataProvider,
}
