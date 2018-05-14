module Buttons exposing (buttons, onIncrement, onReset)

import Html exposing (div, text, button)
import Html.Events exposing (onClick)
import Actions exposing (Action)

type Attribute = OnIncrement Action | OnReset Action
onIncrement action = OnIncrement action
onReset action = OnReset action

incrementEvent attributes =  case attributes of
    (OnIncrement handler)::_ -> [onClick handler]
    _::tail -> incrementEvent tail
    _ -> []

resetEvent attributes =  case attributes of
    (OnReset handler)::_ -> [onClick handler]
    _::tail -> resetEvent tail
    _ -> []

incrementButton attributes = let
        caption = text "increment"
        events = incrementEvent attributes
    in button events [caption]

resetButton attributes = let
        caption = text "reset"
        events = resetEvent attributes
    in button events [caption]

buttons attributes = div [][
        incrementButton attributes,
        resetButton attributes
    ]
