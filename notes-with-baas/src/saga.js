import {takeLatest, call, put} from 'redux-saga/effects'
import {
    requestLogin,
    resetLogin,
    loginChanged,
    requestAddNote,
    requestCompleted,
    notesChanging,
    requestChangeNote,
} from './actions'
import * as api from './api'

function* signIn({payload: {email, password}}) {
    try {
        yield call(api.signIn, email, password)
        yield put(loginChanged())
    } catch (e) {
        console.log(e)
        yield put(resetLogin())
    }
}

function* addNote({payload}) {
    yield put(notesChanging())
    try {
        yield call(api.addNote, payload)
    } catch (e) {
        console.log(e)
    }
    yield put(requestCompleted())
}

function* changeNote({payload}) {
    yield put(notesChanging())
    try {
        yield call(api.changeNote, payload)
    } catch (e) {
        console.log(e)
    }
    yield put(requestCompleted)
}

export default () => function* saga() {
    yield takeLatest(requestLogin, signIn)
    yield takeLatest(requestAddNote, addNote)
    yield takeLatest(requestChangeNote, changeNote)
}
