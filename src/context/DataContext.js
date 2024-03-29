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
      this.setState({ items: storedItems.map(item => new Item(item)) })
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
    const newItem = new Item({...item})
    this.setState({ items: [...items, newItem] })
  }

  updateItem = item => {
    const { items } = this.state
    const match = items.find(i => i.id === item.id)
    if (match) {
      const updatedItems = items.map(i => {
        if (i.id === item.id) {
          return new Item({...item})
        }
        return i
      })
      this.setState({ items: updatedItems })
    }
  }

  removeItem = item => {
    const { items } = this.state
    const match = items.find(i => i.id === item.id)
    if (match) {
      const updatedItems = items.filter(i => i.id !== item.id)
      this.setState({ items: updatedItems })
    }
  }

  resetItem = item => {
    const { items } = this.state
    const match = items.find(i => i.id === item.id)
    if (match) {
      const updatedItems = items.map(i => {
        if (i.id === item.id) {
          i.reset()
        }
        return i
      })
      this.setState({ items: updatedItems })
    }
  }

  importData = dataString => {
    let items
    try {
      const decoded = decodeURI(typeof atob !== 'undefined' ? atob(dataString) : dataString)
      items = JSON.parse(decoded)
    } catch (e) {
      throw e
    }

    this.setState({ items: items.map(item => new Item(item)) })
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
          resetItem: this.resetItem,
          importData: this.importData,
          updateItem: this.updateItem,
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
