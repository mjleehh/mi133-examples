import initialState from './state'

import {
    CLOSE_DIALOG,
    SET_USER_INFO,
    SET_USERS,
    SET_CHATS,
    SET_ACTIVE_CHAT,
    RESET_APP,
    OPEN_LOGIN_PAGE,
    OPEN_SIGNUP_PAGE,
    SET_CURRENT_MESSAGE,
} from './actions'

import {
    LOGIN_LOGIN,
    LOGIN_SIGNUP,
}  from './constants'



function uiReducer(uiState, {type, payload}) {
    switch (type) {
        case CLOSE_DIALOG: {
            return {...uiState, dialog: null}
        }
        case OPEN_LOGIN_PAGE: {
            return {...uiState, loginPage: LOGIN_LOGIN}
        }
        case OPEN_SIGNUP_PAGE: {
            return {...uiState, loginPage: LOGIN_SIGNUP}
        }
        case SET_CURRENT_MESSAGE: {
            const {otherId, message} = payload
            const currentMessages = {...uiState.currentMessages}
            currentMessages[otherId] = message
            return {...uiState, currentMessages}
        }
        default:
            return uiState
    }
}

function dataReducer(dataState, {type, payload}) {
    switch (type) {
        case SET_USER_INFO: {
            return {...dataState, userInfo: payload}
        }
        case SET_USERS: {
            return {...dataState, users: payload}
        }
        case SET_CHATS: {
            return {...dataState, chats: payload}
        }
        case SET_ACTIVE_CHAT: {
            return {...dataState, activeChat: payload}
        }
        default:
            return dataState
    }
}

export default function reducer(state = initialState(), action) {
    const {type} = action
    if (type === RESET_APP) {
        return initialState()
    } else if (type.startsWith('UI/')) {
        const ui = uiReducer(state.ui, action)
        return {...state, ui}
    } else if (type.startsWith('DATA/')) {
        const data = dataReducer(state.data, action)
        return {...state, data}
    } else {
        return state
    }
}
