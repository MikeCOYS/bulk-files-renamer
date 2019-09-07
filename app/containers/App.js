// @flow
import * as React from 'react'
import 'normalize.css/normalize.css' // normalize css for all browsers

import styles from './App.css'

type Props = {
  children: React.Node
}

export default class App extends React.Component<Props> {
  props: Props

  render() {
    const { children } = this.props
    return (
      <div className={styles.container} data-tid="container">
        {children}
      </div>
    )
  }
}
