export default {
    create: (width, height, initialValue = false) => {
        const pixels = new Array(width * height).fill(initialValue)
        return {
            pixels,
            width,
            height,
        }
    },

    getValue: (matrix, x, y) => {
        const {pixels, width} = matrix
        return pixels[y * width + x]
    },

    setValue: (matrix, x, y, pixelValue) => {
        const {pixels, width} = matrix
        pixels.slice()
        pixels[y * width + x] = pixelValue
        return {...matrix, pixels}
    },
}
