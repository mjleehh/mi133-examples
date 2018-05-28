import React from 'react'

import style from './Spacer.scss'

export default function(props) {
    if (props.horizontal) {
        if (props.small) {
            return <div style={style.smalllHorizontalSpacer}> </div>
        } else if (props.large) {
            return <div style={style.largeHorizontalSpacer}> </div>
        } else {
            return <div style={style.horizontalSpacer}> </div>
        }
    } else {
        if (props.small) {
            return <div style={style.smallVerticalSpacer}> </div>
        } else if (props.large) {
            return <div style={style.largeVerticalSpacer}> </div>
        } else {
            return <div style={style.verticalSpacer}> </div>
        }
    }
}
