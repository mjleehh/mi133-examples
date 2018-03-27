export default {
    create: (width, height, initialValue = false) => {
        const values = new Array(width * height).fill(initialValue)
        return {
            values,
            width,
            height,
        }
    },

    getValue: (matrix, x, y, value) => {
        const {values, width} = matrix
        return values[y * width + x]
    },

    setValue: (matrix, x, y, value) => {
        const {values, width} = matrix
        values.splice(0)
        values[y * width + x] = value
        return {...matrix, values}
    },
}
