module Actions exposing (..)

import Http

-- all actions required by the application
--
-- actions prefixed with REQ trigger API calls
type Action =
  REQ_GET_COUNT
  | SET_COUNT (Result  Http.Error Int)
  | REQ_INCREMENT_COUNT
  | INCREMENT_COUNT (Result  Http.Error Int)
  | REQ_RESET_COUNT
  | RESET_COUNT (Result  Http.Error Int)
