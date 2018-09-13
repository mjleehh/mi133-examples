import {EAST, NORTH, SOUTH, WEST} from "../logic/constants";

export function invert(direction) {
    switch (direction) {
        case WEST: {
            return EAST
        }
        case EAST: {
            return WEST
        }
        case NORTH: {
            return SOUTH
        }
        case SOUTH: {
            return NORTH
        }
        default:
            throw `invalid direction ${direction}`
    }
}
