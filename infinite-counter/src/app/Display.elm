module Display exposing (display)

import Html exposing (div, text)
import Html.Attributes exposing (style)
import Style exposing (fontSize)

displayStyle = [
        fontSize "3em"
    ]

display state = div [style displayStyle][
        text (toString state.count)
    ]
