module Buttons exposing (buttons, onIncrement, onReset)

import Html exposing (div, text, button)
import Html.Events exposing (onClick)
import Html.Attributes exposing (style)
import Actions exposing (Action)

import Spacer exposing (spacer)
import ButtonsStyle exposing (buttonsStyle, buttonStyle)

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
    in button (addButtonStyle events) [caption]

resetButton attributes = let
        caption = text "reset"
        events = resetEvent attributes
    in button (addButtonStyle events) [caption]

addButtonStyle attributes = attributes ++ [style buttonStyle]

buttons attributes = div [style buttonsStyle][
        incrementButton attributes,
        spacer [],
        resetButton attributes
    ]
