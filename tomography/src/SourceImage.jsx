import React from 'react'
import Dropzone from 'react-dropzone'


const imageCanvasStyle = {
    width: '200px',
    height: '200px',
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
        const {emModule, exports} = this.props.module
        const {imageFile} = this.state
        const img = new Image()
        img.onload = () => {
            const ctx = this.refs.canvas.getContext('2d')
            ctx.drawImage(img, 0, 0)

            const data = ctx.getImageData(0, 0, 5, 5).data
            let buffer = null

            try {
                // Allocate some space in the heap for the data (making sure to use the appropriate memory size of the elements)
                buffer = emModule._malloc(data.length * data.BYTES_PER_ELEMENT)

                // Assign the data to the heap - Keep in mind bytes per element
                emModule.HEAPU8.set(data, buffer)

                // Finally, call the function with "number" parameter type for the array (the pointer), and an extra length parameter
                const res = exports.addArray(buffer, 20)
            } catch (e) {
                console.log(e)
            } finally {
                // To avoid memory leaks we need to always clear out the allocated heap data
                // This needs to happen in the finally block, otherwise thrown errors will stop code execution before this happens
                emModule._free(buffer)
            }

        }
        img.src = imageFile

    }

    render() {


        const {imageFile} = this.state

        return <div className="centered-column">
            <Dropzone
                multiple={false}
                accept="image/*"
                onDrop={this.handleDrop.bind(this)}>
                <p>drag image or click</p>
            </Dropzone>
            <canvas ref="canvas" style={imageCanvasStyle}/>
        </div>
    }
}