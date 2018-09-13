import {setGoogleCast} from "../../common/actions";

export default class SenderEvents {
    constructor(store, debugLevel = cast.framework.LoggerLevel.DEBUG) {
        const isGoogleCast = / CrKey\//.test(navigator.userAgent)
        store.dispatch(setGoogleCast(isGoogleCast))

        if (this._isGoogleCast) {
            cast.framework.CastReceiverContext.getInstance().setLoggerLevel(debugLevel)
            cast.framework.CastReceiverContext.getInstance()
                .addCustomMessageListener('urn:x-cast:com.appspott.giraffe-game', msg => {
                    store.dispatch(msg.data)
                    return store.getState()
                })
            cast.framework.CastReceiverContext.getInstance().start()
        }
        this._isGoogleCast = isGoogleCast
    }

    isChromecast() {
        return this._isGoogleCast
    }
}
