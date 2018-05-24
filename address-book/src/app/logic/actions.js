import axios from 'axios'

// plain actions

export const RESET_APP = 'RESET_APP'
export const resetApp = () => ({type: RESET_APP})

// ui

export const OPEN_ADD_CONTACT_DIALOG = 'UI/OPEN_ADD_CONTACT_DIALOG'
export const openAddContactDialog = () => ({type: OPEN_ADD_CONTACT_DIALOG})

export const CLOSE_DIALOG = 'UI/CLOSE_DIALOG'
export const closeDialog = () => ({type: CLOSE_DIALOG})

export const SET_CACHED_USERS = 'UI/SET_CACHED_USERS'
export const setCachedUsers = cachedUsers => ({type: SET_CACHED_USERS, payload: cachedUsers})

// data

export const SET_USER_INFO = 'DATA/SET_USER_INFO'
export const setUserInfo = userInfo => ({type: SET_USER_INFO, payload: userInfo})

export const SET_CONTACTS = 'DATA/SET_CONTACTS'
export const setContacts = contacts => ({type: SET_CONTACTS, payload: contacts})

export const ADD_CONTACT = 'DATA/ADD_CONTACT'
export const addContact = contact => ({type: ADD_CONTACT, payload: contact})

export const REMOVE_CONTACT = 'DATA/REMOVE_CONTACT'
export const removeContact = _id => ({type: REMOVE_CONTACT, payload: _id})

// thunks

export const startAddContactDialog = () => async dispatch => {
    try {
        const usersRes = await axios.get('/api/users')
        dispatch(setCachedUsers(usersRes.data.users))
        dispatch(openAddContactDialog())
    } catch (e) {
        console.error(e)
    }
}

export const requestAddContact = (user, contact) => async dispatch => {
    try {
        await axios.post('/api/me/contact', {contact})
        const {data} = await axios.get(`/api/user/${contact}`)
        dispatch(addContact(data))
    } catch (e) {
        console.error(e)
    }
}


export const requestData = () => async dispatch => {
    try {
        const userRes = await axios.get('/api/me')
        dispatch(setUserInfo(userRes.data))
        const contactsRes = await axios.get('/api/me/contacts')
        dispatch(setContacts(contactsRes.data.contacts))
    } catch (e) {
        console.error(e)
    }
}

export const requestLogin = (email, password) => async dispatch => {
    try {
        const loginRes = await axios.put('/api/auth/login', {email, password})
        dispatch(setUserInfo(loginRes.data))
        const contactsRes = await axios.get('/api/me/contacts')
        dispatch(setContacts(contactsRes.data.contacts))
    } catch (e) {
        console.error(e)
    }
}

export const requestLogout = () => async dispatch => {
    try {
        await axios.put('/api/auth/logout', {})
        dispatch(resetApp())
    } catch (e) {
        console.error(e)
    }
}

export const requestRemoveContact = _id => async dispatch => {
    try {
        const {data} = await axios.delete(`/api/me/contact/${_id}`)
        dispatch(removeContact(_id))
    } catch (e) {
        console.error(e)
    }
}

