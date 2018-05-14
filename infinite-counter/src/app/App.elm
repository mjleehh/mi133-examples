module App exposing (view)

import Html exposing (button, div, text)
import Html.Events exposing (onClick)
import Actions
import Spacer exposing (spacer)


view state = div[][
        div [][text "Infinite Counter"],
        spacer [Spacer.Vertical, Spacer.Large],
        text (toString state.count),
        spacer [Spacer.Vertical, Spacer.Large],
        button [onClick Actions.REQ_INCREMENT_COUNT][text "increment"],
        button [onClick Actions.REQ_RESET_COUNT][text "reset"]
    ]
