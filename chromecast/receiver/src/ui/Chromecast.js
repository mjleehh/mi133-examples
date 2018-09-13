export default class Chromecast {
    constructor(debugLevel = cast.framework.LoggerLevel.DEBUG) {
        this._isGoogleCast = / CrKey\//.test(navigator.userAgent)

        if (this._isGoogleCast) {
            cast.framework.CastReceiverContext.getInstance().setLoggerLevel(debugLevel)
            cast.framework.CastReceiverContext.getInstance()
                .addCustomMessageListener('urn:x-cast:com.appspott.giraffe-game', msg => {
                    const {_messageHandler} = this
                    if (_messageHandler) {
                        _messageHandler(msg.data)
                    }
                })
            cast.framework.CastReceiverContext.getInstance().start()
        }
    }

    isChromecast() {
        return this._isGoogleCast
    }

    setMessageHandler(handler) {
        if (!this.isChromecast()) {
            console.warn('this device is not a chromecast')
            console.warn('you will not receive any chromecast messages')
            return
        }
        this._messageHandler = handler
    }
}
