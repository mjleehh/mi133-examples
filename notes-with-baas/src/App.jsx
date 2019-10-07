import React from 'react'
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import Login from "./Login"
import NoteView from "./NoteView";


export default class App extends React.Component {
    render() {
        return <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/" component={NoteView}/>
            </Switch>
        </BrowserRouter>
    }
}