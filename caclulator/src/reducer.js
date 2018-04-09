import {
    ADD_DIGIT,
    ADD_DOT,
    REMOVE_DIGIT,
    SET_OPERATOR,
    CALCULATE,
    RESET,


} from './actions'

// initials

const initialRhs = () => ({
    wholePart: '0',
    fracPart: null,
})

const initialState = () => ({
    ...initialRhs(),
    acc: null,
})

// helpers

function appendDigitAsString(s, digit) {
    return `${s}${digit}`
}

function isDigit(payload) {
    const isDgitExp = /[0-9]/
    return isDgitExp.test(payload)
}

function partsToNumber(wholePart, fracPart) {
    let num = fracPart === null ?
        wholePart :
        `${wholePart}.${fracPart}`
    return Number(num)
}

function numberToParts(num) {
    const partStrings = String(num).split('.')
    if (partStrings.length < 2) {
        return {
            wholePart: partStrings[0],
            fracPart: null,
        }
    }
    else {
        return {
            wholePart: partStrings[0],
            fracPart: partStrings[1],
        }
    }
}

function applyOperator(operator, acc, num) {
    switch (operator) {
        case '+': {
            return acc + num
        }
        case '-': {
            return acc - num
        }
        case '*': {
            return acc * num
        }
        case '/': {
            if (num === 0) {
                console.log('division by 0')
                return null
            }
            return acc / num
        }
        default:
            return null
    }
}

// reducers

function addDigitReducer(state, digit) {
    if (!isDigit(digit)) {
        console.log('not a valid digit')
        return state
    }

    const {fracPart} = state
    if (fracPart === null) {
        const {wholePart} = state
        if (wholePart === '0') {
            if (digit === '0') {
                return state
            } else {
                return {...state, wholePart: digit}
            }
        }
        return {...state, wholePart: appendDigitAsString(wholePart, digit)}
    } else {
        return {...state, fracPart: appendDigitAsString(fracPart, digit)}
    }
}

function addDotReducer(state) {
    if (state.fracPart !== null) {
        return console.log('already in fraction part')
    }
    return {...state, fracPart: ''}
}

function removeDigitReducer(state) {
    const {wholePart, fracPart} = state
    if (fracPart !== null) {
        if (fracPart.length === 0) {
            return {...state, fracPart: null}
        } else {
            return {...state, fracPart: fracPart.slice(0, -1)}
        }
    } else {
        if (wholePart.length === 1) {
            return {...state, wholePart: '0'}
        } else {
            return {...state, wholePart: wholePart.slice(0, -1)}
        }
    }
}

// ---------------------------------------------------------------------------------------------------------------------

function setOperatorReducer(state, operator) {
    const singleOperatorExp = /^[+\-*\/]$/
    if (!singleOperatorExp.test(operator)) {
        console.log(`invalid operator: ${operator}`)
        return state
    }


    const {acc, wholePart, fracPart} = state
    const displayNum = partsToNumber(wholePart, fracPart)
    const accNumber = acc !== null ?
        applyOperator(acc.operator, acc.number, displayNum) :
        displayNum

    return {
        ...state,
        ...initialRhs(),
        acc: {
            operator,
            number: accNumber,
        }
    }
}

// ---------------------------------------------------------------------------------------------------------------------

/**
 *
 * @param state
 * @returns {*}
 */
function calculateReducer(state) {
    const {acc, wholePart, fracPart} = state

    if (acc === null) {
        console.log('no acc')
        return state
    }

    const num = partsToNumber(wholePart, fracPart)
    let res = applyOperator(acc.operator, acc.number, num)
    if (res === null) {
        return state
    }
    return {...state, acc: null, ...numberToParts(res)}
}

// ---------------------------------------------------------------------------------------------------------------------

function resetReducer(state) {
    return {
        ...state,
        rhs: initialRhs(),
        acc: null,
    }
}

// ---------------------------------------------------------------------------------------------------------------------

/**
 * main reducer function
 *
 * just deligates work to the action specific reducers
 */
export default function reducer(state = initialState(), {type, payload}) {
    switch (type) {
        case ADD_DIGIT: {
            return addDigitReducer(state, payload)
        }
        case ADD_DOT: {
            return addDotReducer(state)
        }
        case REMOVE_DIGIT: {
            return removeDigitReducer(state)
        }
        case SET_OPERATOR: {
            return setOperatorReducer(state, payload)
        }
        case CALCULATE: {
            return calculateReducer(state)
        }
        case RESET: {
            return resetReducer(state)
        }
        default:
            return state
    }
}
