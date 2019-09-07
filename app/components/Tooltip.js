// @flow
import React from 'react'
import classnames from 'classnames'

import styles from './Tooltip.css'

const TOP: 'TOP' = 'TOP'
const RIGHT: 'RIGHT' = 'RIGHT'
const BOTTOM: 'BOTTOM' = 'BOTTOM'
const LEFT: 'LEFT' = 'LEFT'

type TooltipProps = {
  classNames: string,
  content: string,
  direction: typeof TOP | typeof RIGHT | typeof BOTTOM | typeof LEFT
}

export function Tooltip({ classNames, content, direction }: TooltipProps) {
  return (
    <div className={classnames(classNames, styles.tooltip)}>
      <div
        className={classnames({
          [styles.top]: direction === TOP,
          [styles.right]: direction === RIGHT,
          [styles.bottom]: direction === BOTTOM,
          [styles.left]: direction === LEFT
        })}
      >
        <p>{content}</p>
        <i />
      </div>
    </div>
  )
}
