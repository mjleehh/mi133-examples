import axios from 'axios'

// plain actions

export const RESET_APP = 'RESET_APP'
export const resetApp = () => ({type: RESET_APP})

// ui

export const OPEN_ADD_CHAT_DIALOG = 'UI/OPEN_ADD_CHAT_DIALOG'
export const openAddChatDialog = () => ({type: OPEN_ADD_CHAT_DIALOG})

export const CLOSE_DIALOG = 'UI/CLOSE_DIALOG'
export const closeDialog = () => ({type: CLOSE_DIALOG})

export const OPEN_LOGIN_PAGE = 'UI/OPEN_LOGIN_PAGE'
export const openLoginPage = () => ({type: OPEN_LOGIN_PAGE})

export const OPEN_SIGNUP_PAGE = 'UI/OPEN_SIGNUP_PAGE'
export const openSignupPage =  () => ({type: OPEN_SIGNUP_PAGE})

export const SET_CURRENT_MESSAGE = 'UI/SET_CURRENT_MESSAGE'
export const setCurrentMessage = (otherId, message) => ({type: SET_CURRENT_MESSAGE, payload: {otherId, message}})

// data

export const SET_USER_INFO = 'DATA/SET_USER_INFO'
export const setUserInfo = userInfo => ({type: SET_USER_INFO, payload: userInfo})

export const SET_USERS = 'DATA/SET_USERS'
export const setUsers = users => ({type: SET_USERS, payload: users})

export const SET_CHATS = 'DATA/SET_CHATS'
export const setChats = chats => ({type: SET_CHATS, payload: chats})

export const SET_ACTIVE_CHAT = 'DATA/SET_ACTIVE_CHAT'
export const setActiveChat = (otherId, messages) => ({type: SET_ACTIVE_CHAT, payload: {otherId, messages}})

// thunks

export const requestData = () => async dispatch => {
    try {
        const [user, users, chats] = await Promise.all([
            axios.get('/api/me'),
            axios.get('/api/users'),
            axios.get('/api/chats'),
        ])
        dispatch(setUserInfo(user.data))
        dispatch(setUsers(users.data.users))
        dispatch(setChats(chats.data.chats))
    } catch (e) {
        console.error(e)
    }
}

export const requestSetActiveChat = otherId => async dispatch => {
    const chatRes = await axios.get(`/api/chat/${otherId}`)
    dispatch(setActiveChat(otherId, chatRes.data.messages))
}


export const requestLogin = (email, password) => async dispatch => {
    try {
        await axios.put('/api/auth/login', {email, password})
        dispatch(requestData())
    } catch (e) {
        console.error(e)
    }
}

export const requestSignup = (email, nickname, password) => async dispatch => {
    try {
        const signupRes = await axios.post('/api/auth/signup', {email, nickname, password})
        dispatch(setUserInfo(signupRes.data))
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

