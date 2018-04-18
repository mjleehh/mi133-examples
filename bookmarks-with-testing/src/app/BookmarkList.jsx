import {connect} from "react-redux"
import React from "react"

import Bookmark from './Bookmark'

import style from './BookmarkList.iscss'

@connect(({bookmarks}) => ({bookmarks}))
export default class BookmarkList extends React.Component {
    render() {
        const bookmarkList = this.props.bookmarks.map((bookmark, idx) => {
            return <Bookmark key={idx} {...bookmark} />
        })
        return <div style={style.bookarkListContainer}>
            {bookmarkList}
        </div>
    }
}
