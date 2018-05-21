import {
    OPEN_ADD_CONTACT_DIALOG,
    CLOSE_DIALOG,
    SET_CONTACTS,
    SET_USER_INFO,
    RESET_APP, SET_CACHED_USERS,
} from './actions'
import {DIALOG_ADD_CONTACT} from './constants'

const initialState = () => ({
    ui: {
        dialog: null,
        addContact: {
            cachedUsers: [],
        }
    },
    data: {
        userInfo: null,
        contacts: [],
    },
})

function uiReducer(uiState, {type, payload}) {
    switch (type) {
        case OPEN_ADD_CONTACT_DIALOG: {
            return {...uiState, dialog: DIALOG_ADD_CONTACT}
        }
        case CLOSE_DIALOG: {
            return {...uiState, dialog: null}
        }
        case SET_CACHED_USERS: {
            const {addContact} = uiState
            return {...uiState, addContact: {...addContact, cachedUsers: payload}}
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
        case SET_CONTACTS: {
            return {...dataState, contacts: payload}
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
