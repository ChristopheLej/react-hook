import React, { useRef, useState } from 'react'
import { Dropdown as DropdownNoneHooks } from './components/DropdownNoneHooks'
import { Dropdown as DropdownWithHooks } from './components/DropdownNoneHooks'
import { Dropdown as DropdownWithCallback } from './components/DropdownNoneHooks'

interface IAppProps {}

interface IAppState {
  vegetable01: string
  vegetable02: string
  vegetable03: string
}

const styles = {
  container: {
    display: 'flex'
  },
  cell: {
    flex: '1 1 auto'
  }
}

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props)
    this.state = { vegetable01: '', vegetable02: '', vegetable03: '' }
  }

  render() {
    const { vegetable01, vegetable02, vegetable03 } = this.state

    return (
      <div style={styles.container}>
        <div style={styles.cell}>
          <DropdownNoneHooks
            placeholder="Dropdown none hooks"
            value={vegetable01}
            onChange={e => this.setState({ vegetable01: e })}
            options={['Tomato', 'Cucumber', 'Potato']}
          />
        </div>
        <div style={styles.cell}>
          <DropdownWithHooks
            placeholder="Dropdown with hooks"
            value={vegetable02}
            onChange={e => this.setState({ vegetable02: e })}
            options={['Tomato', 'Cucumber', 'Potato']}
          />
        </div>
        <div style={styles.cell}>
          <DropdownWithCallback
            placeholder="Dropdown with callback"
            value={vegetable03}
            onChange={e => this.setState({ vegetable03: e })}
            options={['Tomato', 'Cucumber', 'Potato']}
          />
        </div>
      </div>
    )
  }
}
