import React from 'react'

import AddBookmark from './AddBookmark'
import BookmarkList from './BookmarkList'


export default class App extends React.Component {
    render() {
        return <div className="column appContainer">
            <AddBookmark/>
            <BookmarkList/>
        </div>
    }
}
