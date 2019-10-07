import {takeLatest, call, put} from 'redux-saga/effects'
import {requestLogin, resetLogin, loginChanged} from './actions'


function signIn(auth) {
    return function*({payload: {email, password}}) {
        try {
            yield call(auth.signInWithEmailAndPassword.bind(auth), email, password)
            yield put(loginChanged())
        } catch (e) {
            console.log(e)
            yield put(resetLogin())
        }
    }
}

export default auth => function* saga() {
    yield takeLatest(requestLogin, signIn(auth))
}
