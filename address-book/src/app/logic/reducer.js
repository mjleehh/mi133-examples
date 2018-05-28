import {
    OPEN_ADD_CONTACT_DIALOG,
    CLOSE_DIALOG,
    SET_CONTACTS,
    SET_USER_INFO,
    RESET_APP, SET_CACHED_USERS,
    REMOVE_CONTACT,
    ADD_CONTACT,
    OPEN_LOGIN_PAGE,
    OPEN_SIGNUP_PAGE
} from './actions'
import {DIALOG_ADD_CONTACT, LOGIN_LOGIN, LOGIN_SIGNUP} from './constants'

const initialState = () => ({
    ui: {
        dialog: null,
        loginPage: LOGIN_LOGIN,
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
        case OPEN_LOGIN_PAGE: {
            return {...uiState, loginPage: LOGIN_LOGIN}
        }
        case OPEN_SIGNUP_PAGE: {
                return {...uiState, loginPage: LOGIN_SIGNUP}
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
        case ADD_CONTACT: {
            const contacts = [...dataState.contacts, payload]
            return {...dataState, contacts}
        }
        case REMOVE_CONTACT: {
            const contacts = dataState.contacts.filter(contact => contact._id !== payload)
            return {...dataState, contacts}
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
