import {EAST, NORTH, SOUTH, WEST} from "./directions";
import {setDirection} from "./actions";

export function keyCodeToEvent(keyCode) {
    switch (keyCode) {
        case 37: {
            return setDirection(WEST)
        }
        case 38: {
            return setDirection(NORTH)
        }
        case 39: {
            return setDirection(EAST)
        }
        case 40: {
            return setDirection(SOUTH)
        }
        default:
            return null
    }
}
