import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'


import SourceImage from "./SourceImage"

const styles = (theme) => ({
    toolbar: theme.mixins.toolbar,
})

function App(props) {
    const {classes, module} = props

    return <div>
        <div>
        <AppBar position="fixed">
            <ToolBar>
                <Typography variant="title" color="inherit">
                    Tomography
                </Typography>
            </ToolBar>
        </AppBar>
        </div>
        <div className={classes.toolbar}></div>
        <SourceImage module={module}/>
    </div>
}

export default withStyles(styles)(App)