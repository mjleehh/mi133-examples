module App exposing (app)

import Html exposing (button, div, text)
import Html.Events exposing (onClick)
import Html.Attributes exposing (style)

import Actions
import Spacer exposing (spacer)

import Display exposing (display)
import Buttons exposing (buttons, onIncrement, onReset)

import AppStyle exposing (wrapperStyle, containerStyle, titleStyle)

app state = div[style wrapperStyle][
        div [style titleStyle][text "Infinite Counter"],
        div [style containerStyle] [
            spacer [Spacer.Vertical, Spacer.Large],
            display state,
            spacer [Spacer.Vertical, Spacer.Large],
            buttons [onIncrement Actions.REQ_INCREMENT_COUNT, onReset Actions.REQ_RESET_COUNT]
        ]
    ]
