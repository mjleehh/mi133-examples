import React from 'react'

import style from './Spacer.iscss'

export default class Spacer extends React.Component {
    render() {
        if (this.props.horizontal) {
            if (this.props.small) {
                return <div style={style.smalllHorizontalSpacer}> </div>
            } else {
                return <div style={style.horizontalSpacer}> </div>
            }
        } else {
            if (this.props.small) {
                return <div style={style.smallVerticalSpacer}> </div>
            } else {
                return <div style={style.verticalSpacer}> </div>
            }
        }
    }
}
