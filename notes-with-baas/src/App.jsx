import React from 'react'
import {Layout, Button, Menu, Icon} from "antd"

import CreateNote from "./CreateNote"
import NoteView from "./NoteView"
import {connect} from 'react-redux'
import {showAddModal} from './actions'

@connect(({modal}) => ({modal}))
export default class App extends React.Component {
    onAdd = () => {
        this.props.dispatch(showAddModal())
    }

    onLogout = () => {

    }

    render() {
        const showAdd = this.props.modal === 'add'

        return <Layout>
            <Layout.Header><div style={{color: '#fff'}}>Notes With Firebase</div></Layout.Header>
            <Layout>
            <Layout.Sider width='12em' style={{background: '#fff'}}>
                <CreateNote visible={showAdd}/>
                <Menu>
                    <Menu.Item onClick={this.onAdd}><Icon type='plus'/>add</Menu.Item>
                    <Menu.Item onClick={this.onLogout}><Icon type='logout'/>sign out</Menu.Item>
                </Menu>
            </Layout.Sider>
            <Layout.Content>
            <NoteView/>
            </Layout.Content>
            </Layout>
        </Layout>
    }
}