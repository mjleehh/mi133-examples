export const NORTH = 'NORTH'
export const SOUTH = 'SOUTH'
export const WEST = 'WEST'
export const EAST = 'EAST'

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
