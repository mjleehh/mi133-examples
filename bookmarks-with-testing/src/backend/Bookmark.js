import mongoose from "mongoose"
import validators from 'validator'

export const filterBookmarkProperties = ({_id, name, url}) => ({_id, name, url})

const bookmarkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
    },
    url: {
        type: String,
        required: true,
        validate: {
            validator: validators.isURL,
            message: '{VALUE} is no url'
        }
    },
})

export default mongoose.model('bookmarks', bookmarkSchema)
