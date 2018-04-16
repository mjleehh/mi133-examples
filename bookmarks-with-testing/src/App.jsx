import React from 'react'
import {connect} from 'react-redux'

import AddBookmark from './AddBookmark'

@connect(({bookmarks}) => ({bookmarks}))
class BookmarkList extends React.Component {
    render() {
        const bookmarkList = this.props.bookmarks.map((bookmark, idx) => {
            const {name, url} = bookmark
            return <div key={idx}>
                <div><label>name</label>{name}</div>
                <div><label>url</label><a href={url}>{url}</a></div>
            </div>
        })
        return <div>{bookmarkList}</div>
    }
}



export default class App extends React.Component {
    render() {
        return <div className="column appContainer">
            <AddBookmark/>
            <BookmarkList/>
        </div>
    }
}
