import {
    GAME_OVER,
    GAME_PAUSED, GAME_STARTED,
    NOT_STARTED,
} from "./constants";
import {
    END_GAME,
    PAUSE_GAME,
    SET_DIRECTION, SET_GOOGLE_CAST,
    START_GAME,
    UPDATE
} from "../../../common/actions";
import Giraffe from "../model/Giraffe";
import Grid from "../model/Grid";
import {WEST, invert} from "../../../common/directions";

function initialState() {
    return {
        gameState: NOT_STARTED,
        grid: {
            width:  16,
            height: 16,
        },
        direction: WEST,
        giraffe: null,
        leaf: null,
        intersection: null,
        isGoogleCast: false,
    }
}

function placeLeaf(grid, giraffe) {
    const {width, height} = grid
    let x = 0
    let y = 0

    do {
        x = Math.floor(Math.random() * width)
        y = Math.floor(Math.random() * height)
    } while(giraffe.intersects({x, y}))

    return {x, y}
}

function startGameReducer(state) {
    const grid = new Grid(state.grid)
    const giraffe = new Giraffe(grid.center())
    const leaf = placeLeaf(grid, giraffe)
    return {
        ...state,
        gameState: GAME_STARTED,
        giraffe: giraffe.toObject(),
        leaf,
        intersection: null,
    }
}

function updateReducer(state) {
    if (state.gameState !== GAME_STARTED) {
        return state
    }

    const currentGiraffe = new Giraffe(state.giraffe)
    const grid = new Grid(state.grid)
    const nextHead = currentGiraffe.nextHead(state.direction)
    if (!grid.contains(nextHead)) {
        return {...state, gameState: GAME_OVER}
    }

    const {direction} = state
    if (_.isEqual(state.leaf, nextHead)) {
        const {giraffe, intersection} = currentGiraffe.grow(direction)
        const leaf = placeLeaf(grid, giraffe)
        return {
            ...state,
            giraffe: giraffe.toObject(),
            leaf,
            intersection,

        }
    }

    const {giraffe, intersection} = currentGiraffe.move(direction)
    if (intersection) {
        return {...state, gameState: GAME_OVER, intersection}
    } else {
        return {...state, giraffe: giraffe.toObject()}
    }
}

function setDirectionReducer(state, direction) {
    if (state.direction === invert(direction)) {
        return state
    }
    return {...state, direction}
}

export default function reducer(state = initialState(), {type, payload}) {
    switch (type) {
        case START_GAME: {
            return startGameReducer(state)
        }
        case PAUSE_GAME: {
            return {...state, gameState: GAME_PAUSED}
        }
        case END_GAME: {
            return state
        }
        case SET_DIRECTION: {
            return setDirectionReducer(state, payload)
        }
        case UPDATE: {
            return updateReducer(state)
        }
        case SET_GOOGLE_CAST: {
            return {...state, isGoogleCast: payload}
        }
        default: {
            return state
        }
    }
}
