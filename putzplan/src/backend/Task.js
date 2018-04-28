import mongoose from "mongoose"
import Resident from './Resident'

export const filterBookmarkProperties = ({_id, name, url}) => ({_id, name, url})

const taskSchema = new mongoose.Schema({
    description: {
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

    const {lastDone, startDate} = retval
    if (lastDone && lastDone.getTime() < startDate.getTime()) {
        throw {message: 'lastDone date can not be before start time'}
    }

    return retval
}

taskSchema.statics.setDescription = async function(_id, description) {
    const task = await this.findOneAndUpdate({_id}, {$set: {description}}, {new: true})
    if (!task) {
        throw {message: `task ${_id} not found`}
    }
    return task
}

taskSchema.statics.setLastDone = async function(_id, lastDone) {
    const task = await this.findOneAndUpdate({_id}, {$set: {lastDone}}, {new: true})
    if (!task) {
        throw {message: `task ${_id} not found`}
    }
    return task
}

export default mongoose.model('tasks', taskSchema)
