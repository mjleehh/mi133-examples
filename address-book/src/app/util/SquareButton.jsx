import React from 'react'

import defaultStyle from './SquareButton.iscss'

export default function(props) {
    const {onClick, style, value} = props

    const handleClick = onClick
        ? onClick
        : () => {}

    const outerStyle = style
        ? {...defaultStyle.button, ...style}
        : defaultStyle.button

    return <div>
        <div style={outerStyle} onClick={handleClick}>
            <div style={defaultStyle.innerButton}>{value}</div>
        </div>
    </div>
}
