import mongoose from "mongoose"
import Resident from './Resident'
import moment from 'moment'

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

taskSchema.statics.removeResident = async function(residentId) {
    const tasks = await this.find({firstResident: residentId})
    if (tasks.length < 1) {
        return
    }

    const nextResidentIds = await Resident.next(residentId)
    if (nextResidentIds.length < 1) {
        throw {message: 'can not delete last resident'}
    }
    const nextResidentId = nextResidentIds[1]
    return this.updateMany({firstResident: residentId}, {$set: {firstResident: nextResidentId}})
}

taskSchema.methods.toObject = function() {
    const {_id, description, firstResident, startDate, lastDone} = this
    return {_id, description, firstResident, startDate, lastDone}
}

taskSchema.methods.doneForThisWeek = function() {
    if (!this.lastDone) {
        return false
    }
    const lastDoneWeekStart = moment(this.lastDone).startOf('isoweek')
    const now = moment()
    const weeksPassed = now.diff(lastDoneWeekStart, 'weeks')
    if (weeksPassed < 0) {
        throw {message: 'last done in the future'}
    }
    return weeksPassed < 1
}

taskSchema.methods.nextResidentsQueue = async function() {
    const startDateWeekStart = moment(this.startDate).startOf('isoweek')
    const now = moment()
    const weeksPassed = now.diff(startDateWeekStart, 'weeks')
    if (weeksPassed < 0) {
        throw {message: 'start date in the future'}
    }
    return await Resident.next(this.firstResident, weeksPassed)
}

taskSchema.methods.status = async function() {
    return {
        done: this.doneForThisWeek(),
        queue: await this.nextResidentsQueue(),
    }
}

export default mongoose.model('tasks', taskSchema)
