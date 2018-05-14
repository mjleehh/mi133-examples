module Spacer exposing (..)

import Html exposing (Html, div, text)
import Html.Attributes exposing (style)
import Style exposing (Style, height, width)


type Attribute = Small | Large | Vertical

myStyle attributes  =
    let expand = if List.member Vertical attributes
                    then height
                    else width
        size = if List.member Large attributes then "1em"
               else if List.member Small attributes then "0.25em"
               else "0.5em"
    in [expand size]

spacer attributes = div [style (myStyle attributes)][text " "]
