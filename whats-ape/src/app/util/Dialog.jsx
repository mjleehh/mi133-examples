import React from 'react'

import style from './Dialog.scss'

export default function Dialog(props) {
    const {title, children} = props
    return <div style={style.container}>
        <div>
            <div style={style.title}>{title}</div>
            <div style={style.body}>
                {children}
            </div>
        </div>
    </div>
}
