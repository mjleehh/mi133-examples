import mongoose from "mongoose"
import Resident from './Resident'

export const filterBookmarkProperties = ({_id, name, url}) => ({_id, name, url})

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
    },
    firstResident: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Resident.modelName,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    lastDone: {
        type: Date,
    },
})

taskSchema.statics.createChecked = async function(doc) {
    const retval = new this(doc)
    await retval.validate()

    if (await Resident.findById(doc.firstResident).count() !== 1) {
        throw {message: 'invalid resident'}
    }

    if (doc.lastDone && doc.lastDone.getTime() < doc.startDate.getTime()) {
        throw {message: 'lastDone date can not be before start time'}
    }

    return retval
}

export default mongoose.model('tasks', taskSchema)
