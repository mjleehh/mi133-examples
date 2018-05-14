module Api exposing (getCount, incrementCount, resetCount)

import Json.Decode as Decode
import Http

apiPrefix path = "http://localhost:3000/api" ++ path

-- convert the JSON response to Int count
decodeCount : Decode.Decoder Int
decodeCount = Decode.at ["currentCount"] Decode.int

-- for some reason the Http lib has little convenience for PUT and DELETE
--
-- little helper to fix this
countRequest method url = Http.request {
        method = method,
        headers = [],
        body = Http.emptyBody,
        url = url,
        expect = Http.expectJson decodeCount,
        timeout = Nothing,
        withCredentials = False
    }

-- the API calls
getCount handler = Http.send handler (countRequest "GET" (apiPrefix "/count"))
incrementCount handler = Http.send handler (countRequest "PUT" (apiPrefix "/count"))
resetCount handler = Http.send handler (countRequest "DELETE" (apiPrefix "/count"))
