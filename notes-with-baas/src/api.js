import * as firebase from 'firebase'
import {notesChanged} from './actions'
import apiConfig from './apiconf.cred'

let db = null
let auth = null
let activeConfig = {
    updateNoteHandler: null,
    logoutHandler: null,
    loginHandler: null,
}

export function init(config) {
    activeConfig = config
    firebase.initializeApp(apiConfig)
    db = firebase.firestore()
    auth = firebase.auth()

    auth.onAuthStateChanged(user => {
        const {loginHandler, logoutHandler, updateNoteHandler} = activeConfig
        if (user && loginHandler) {
            console.log(user)
            loginHandler()
        } else if (!user && logoutHandler) {
            console.log(user)
            logoutHandler()
        }
        if (updateNoteHandler) {
            db.collection('notes').where('uid', '==', auth.currentUser.uid)
                .onSnapshot(updateNoteHandler)
        }
    })
}

export function signIn(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
}

export function addNote(note) {
    const {uid} = auth.currentUser
    const {title, body} = note
    return db.collection(`/notes`).add({uid, title, body})
}

export function changeNote(note) {
    const {uid} = auth.currentUser
    const {id, title, body} = note
    return db.collection('/notes').doc(id).set({uid, title, body})
}
