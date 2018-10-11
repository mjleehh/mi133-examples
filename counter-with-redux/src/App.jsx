import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import Buttons from "./Buttons"
import Count from "./Count"
import Range from "./Range"

const styles = (theme) => ({
    toolbar: theme.mixins.toolbar,
})

function App(props) {
    const {classes} = props

    return <div>
        <div>
        <AppBar position="fixed">
            <ToolBar>
                <Typography variant="title" color="inherit">
                    Counter
                </Typography>
            </ToolBar>
        </AppBar>
        </div>
        <div className={classes.toolbar}></div>
        <Grid container justify="center">
            <div className="column">
                <Count/>
                <Range/>
                <Buttons/>
            </div>
        </Grid>
    </div>
}

export default withStyles(styles)(App)