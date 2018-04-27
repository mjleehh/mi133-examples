/**
 * Add a digit to the number of the right hand side operand.
 *
 * Leading zero will be removed.
 */
export const ADD_DIGIT = 'ADD_DIGIT'
export const addDigit = (digit) => ({type: ADD_DIGIT, payload: digit})

/**
 * Set the decimal point of the right hand side operand.
 */
export const ADD_DOT = 'ADD_DOT'
export const addDot = () => ({type: ADD_DOT})

/**
 * Erase the rightmost character from the right hand side operand.
 *
 * This operation either removes a digit or the decimal dot.
 */
export const REMOVE_DIGIT = 'REMOVE_DIGIT'
export const removeDigit = () => ({type: REMOVE_DIGIT})

/**
 * Set the operation to be performed.
 *
 * If the last operation has not been completed, the result is calulated and the right hand side operand is reset.
 */
export const SET_OPERATOR = 'SET_OPERATOR'
export const setOperator = (operator) => ({type: SET_OPERATOR, payload: operator})

/**
 * Perform calculation.
 *
 * If a operation has been specified take the right hand side operand and perfom the calulation. The result is set as
 * new right hand side operand.
 */
export const CALCULATE = 'CALCULATE'
export const calculate = () => ({type: CALCULATE})

/**
 * Reset the calculator.
 *
 * Reset operation left hand side operand and operator.
 */
export const RESET = 'RESET'
export const reset = () => ({type: RESET})

