import mongoose from "mongoose"

const pixelSchema = new mongoose.Schema({
    x: {
        type: Number,
        required: true,
        index: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    y: {
        type: Number,
        required: true,
        index: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    pixelValue: {
        type: Boolean,
        required: true,
    }
})
pixelSchema.index({x:1, y:1}, {unique: true})

/**
 * Convert pixel matrix to Matrix type.
 *
 * @return {Matrix}
 */
pixelSchema.statics.matrix = async function() {
    const {width, height} = await this.dimensions()

    const res = await this.find({}).sort([
        ['y', 'ascending'],
        ['x', 'ascending']
    ])
    const pixels = res.map(({pixelValue}) => pixelValue)
    return {
        width,
        height,
        pixels,
    }
}

/**
 * Get matrix dimensions.
 *
 * @return {{width: unsigned int, height: unsigned int}}
 */
pixelSchema.statics.dimensions = async function() {
    const width = await this.find({y: 0}).count()
    const height = await this.find({x: 0}).count()
    return {width, height}
}

/** Replace the current pixel matrix with a new one.
 *
 * All pixels are initialized to false.
 *
 * @param {unsigned int} height
 * @param {unsigned int} width
 */
pixelSchema.statics.new = async function(width, height) {
    await this.remove({})
    const pixels = []
    for (let y = 0; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
            pixels.push({x, y, pixelValue: false})
        }
    }
    await this.collection.insert(pixels)
}

/**
 * Resize pixel matrix width.
 *
 * If new columns need to be added they are appended to the right and initialized with value 0.
 *
 * @param {usigned int} newWidth
 */
pixelSchema.statics.resizeX = async function(newWidth) {
    const {width, height} = await this.dimensions()

    if (newWidth < width) {
        // shrink if necessary
        await this.remove({x: {$gte: newWidth}})
        return
    }

    if (newWidth > width) {
        // expand if necessary
        const newPixels = []
        for (let x = width; x < newWidth; ++x) {
            for (let y = 0; y < height; ++y) {
                newPixels.push({x, y, pixelValue: false})
            }
        }
        await this.collection.insert(newPixels)
        return
    }
}

/**
 * Resize pixel matrix height.
 *
 * If new rows need to be added they are appended to the bottom and initialized with value 0.
 *
 * @param {unsigned int} newHeight
 */
pixelSchema.statics.resizeY = async function(newHeight) {
    const {width, height} = await this.dimensions()

    if (newHeight < height) {
        // shrink if necessary
        await this.remove({y: {$gte: newHeight}})
        return
    }

    if (newHeight > height) {
        // expand if necessary
        const newPixels = []
        for (let y = height; y < newHeight; ++y) {
            for (let x = 0; x < width; ++x) {
                newPixels.push({x, y, pixelValue: false})
            }
        }
        await this.collection.insert(newPixels)
        return
    }
}

export default mongoose.model('pixels', pixelSchema)
