import {handleActions} from 'redux-actions'

import {
    hideModal,
    notesChanged,
    notesChanging,
    showAddModal,
    requestCompleted} from './actions'
import initialState from './state'

export default handleActions({
        [notesChanging]: state => ({...state, requests: state.requests + 1}),
        [notesChanged]: (state, {payload}) => ({...state, notes: payload}),
        [showAddModal]: state => ({...state, modal: 'add'}),
        [hideModal]: state => ({...state, modal: null}),
        [requestCompleted]: state => ({...state, reqests: state.requests - 1}),
    }, initialState())
