import React from 'react'
import Dropzone from 'react-dropzone'


const imageCanvasStyle = {
    width: '200px',
    height: '200px',
}

const dropzoneStyle = {
    width: '12em',
    height: '3em',
    background: 'lightblue',
    borderStyle: 'dashed',
}

export default class SourceImage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {imageFile: null}
    }

    handleDrop(accepted, rejected) {

        const reader = new FileReader(accepted)
        reader.onload = e => {
            this.setState({imageFile: e.target.result})
        }
        reader.readAsDataURL(accepted[0])
    }

    componentDidUpdate() {
        const width = 100;
        const height = 100;
        const {emModule, exports} = this.props.module
        const {imageFile} = this.state
        const img = new Image()
        img.onload = () => {
            const ctx = this.refs.canvas.getContext('2d')
            ctx.resetTransform()
            ctx.drawImage(img, 0, 0, width, height)

            const data = ctx.getImageData(0, 0, width, height).data
            let buffer = null
            let resultBuffer = null

            try {
                const numBytes = data.length;
                const numPixels = numBytes / 4;

                // Allocate some space in the heap for the data (making sure to use the appropriate memory size of the elements)
                buffer = emModule._malloc(numBytes)


                // Assign the data to the heap - Keep in mind bytes per element
                emModule.HEAPU8.set(data, buffer)

                // Finally, call the function with "number" parameter type for the array (the pointer), and an extra length parameter
                resultBuffer = exports.gc(buffer, numPixels)
                const outData = new Uint8ClampedArray(emModule.HEAPU8.subarray(resultBuffer, resultBuffer + width * height * 4))
                const outImg = new ImageData(outData, width, height)
                ctx.putImageData(outImg, 100, 0)
            } catch (e) {
                console.log(e)
            } finally {
                // To avoid memory leaks we need to always clear out the allocated heap data
                // This needs to happen in the finally block, otherwise thrown errors will stop code execution before this happens
                emModule._free(buffer)
                emModule._free(resultBuffer)
            }
        }
        img.src = imageFile

    }

    render() {


        const {imageFile} = this.state

        return <div className="centered-column">
            <Dropzone
                style={dropzoneStyle}
                multiple={false}
                accept="image/*"
                onDrop={this.handleDrop.bind(this)}>
                <p>drag image or click</p>
            </Dropzone>
            <canvas ref="canvas" width="200" height="200" style={imageCanvasStyle}/>
        </div>
    }
}