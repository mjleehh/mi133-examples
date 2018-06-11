import {LOGIN_LOGIN} from './constants'

export default () => ({
    ui: {
        dialog: null,
        loginPage: LOGIN_LOGIN,
        currentMessages: {},
    },
    data: {
        userInfo: null,
        chats: [],
        users: [],
        activeChat: null,
    },
})
