import React from 'react'
import _ from 'lodash'

import style from './FlexibleGrid.iscss'

export default function FlexibleGrid(props) {
        const {width, gap, children} = props
        if (isNaN(width)) {
            throw 'invalid width prop'
        }

        const numChildren = children.length
        const height = Math.ceil(numChildren / width)

        const itemWidth = 100 / width

        const rows = []
        for (let i = 0; i < height; ++i) {
            const row = []
            for (let j = 0; j < width; ++j) {
                const index = i * width + j
                const style = {width: `${itemWidth}%`}
                if (!!gap && j !== 0) {
                    row.push(<div style={{width: gap}} key={`gap-${j}`}> </div>)
                }

                if (index < numChildren) {
                    row.push(<div style={style} key={j}>{children[index]}</div>)
                } else {
                    row.push(<div style={style} key={j}> </div>)
                }

            }
            if (!!gap && i !== 0) {
                rows.push(<div style={{height: gap}} key={`gap-${i}`}> </div>)
            }

            rows.push(<div style={style.gridRow} key={i}>{row}</div>)

        }

        return <div style={style.gridContainer}>
            {rows}
        </div>
}