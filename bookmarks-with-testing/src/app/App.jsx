import React from 'react'

import AddBookmark from './AddBookmark'
import BookmarkList from './BookmarkList'
import Spacer from "./Spacer"

import style from './App.iscss'

export default class App extends React.Component {
    render() {
        return <div style={style.container}>
            <div style={style.header}>Bookmarks</div>
            <Spacer/>
            <AddBookmark/>
            <Spacer/>
            <BookmarkList/>
        </div>
    }
}
