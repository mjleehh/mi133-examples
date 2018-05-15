module AppStyle exposing (wrapperStyle, containerStyle, titleStyle)

import Style exposing (..)

import CommonStyles exposing (..)

wrapperStyle = [
        position "absolute",
        left "50%",
        top "50%",
        transform "translate(-50%, -50%)"
    ]

containerStyle = [
        width "100%",
        background green,
        padding normalGap,
        display "flex",
        flexDirection "column",
        alignItems "center"
   ]

titleStyle = [
        width "100%",
        textAlign "center",
        padding normalGap,
        background darkGreen
    ]
