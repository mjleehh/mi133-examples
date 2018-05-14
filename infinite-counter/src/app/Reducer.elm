module Reducer exposing (reducer, initialState)

import Actions exposing (..)
import State exposing (State)
import Api


initialState : (State, Cmd Action)
initialState = ({count = 0}, Api.getCount SET_COUNT)

reducer : Action -> State -> (State, Cmd Action)
reducer action state = case action of
    REQ_GET_COUNT -> (state, Api.getCount SET_COUNT)
    SET_COUNT (Ok count) -> ({state | count = count}, Cmd.none)
    SET_COUNT (Err _) -> (state, Cmd.none)
    REQ_INCREMENT_COUNT -> (state, Api.incrementCount INCREMENT_COUNT)
    INCREMENT_COUNT (Ok count) -> ({state | count = state.count + 1}, Cmd.none)
    INCREMENT_COUNT (Err _) -> (state, Cmd.none)
    REQ_RESET_COUNT -> (state, Api.resetCount RESET_COUNT)
    RESET_COUNT (Ok count) -> ({state | count = 0}, Cmd.none)
    RESET_COUNT (Err _) -> (state, Cmd.none)
