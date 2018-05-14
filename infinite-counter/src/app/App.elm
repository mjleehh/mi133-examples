module App exposing (app)

import Html exposing (button, div, text)
import Html.Events exposing (onClick)
import Actions
import Spacer exposing (spacer)

import Display exposing (display)
import Buttons exposing (buttons, onIncrement, onReset)

app state = div[][
        div [][text "Infinite Counter"],
        spacer [Spacer.Vertical, Spacer.Large],
        display state,
        spacer [Spacer.Vertical, Spacer.Large],
        buttons [onIncrement Actions.REQ_INCREMENT_COUNT, onReset Actions.REQ_RESET_COUNT]
    ]
