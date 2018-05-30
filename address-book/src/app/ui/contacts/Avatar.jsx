import React from 'react'

import defaultStyle from './Avatar.scss'

export default function Avatar(props) {
    const {onClick, style, value} = props

    const handleClick = onClick
        ? onClick
        : () => {}

    const outerStyle = style
        ? {...defaultStyle.avatar, ...style}
        : defaultStyle.avatar

    return <div style={outerStyle} onClick={handleClick}>
            <div style={defaultStyle.innerAvatar}>{value}</div>
        </div>
}
