module Display exposing (display)

import Html exposing (div, text)

display state = div [][
        text (toString state.count)
    ]
