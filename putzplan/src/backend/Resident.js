import mongoose from "mongoose"
import _ from "lodash"

const residentProjection  = '_id name surname createdAt'

const residentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

residentSchema.statics.createChecked = async function(doc) {
    const retval = new this(doc)
    await retval.validate()

    if (_.has(doc, '_id')) {
        throw {error: 'explicit _id forbidden on creation'}
    }

    if (_.has(doc, 'createdAt')) {
        throw {error: 'creation timestamp can not be set'}
    }

    return retval
}

residentSchema.statics.sorted = function() {
    return this
        .find({}, residentProjection)
        .sort([['createdAt', 'asc'], ['surname', 'asc'], ['name', 'asc']])
}

residentSchema.statics.next = async function(residentId, offset = 0) {
    const _id = residentId.toString()
    const sortedResidentIds = (await this.sorted()).map(({_id}) => _id.toString())
    const residentIndex = _.findIndex(sortedResidentIds, otherId => otherId === _id)
    if (residentIndex < 0) {
        throw {message: `invalid resident id ${_id}`}
    }
    const residentIndexWithOffset = (residentIndex + offset) % sortedResidentIds.length

    const retval = []
    for (let i = residentIndexWithOffset; i < sortedResidentIds.length; ++i) {
        retval.push(sortedResidentIds[i])
    }
    for (let i = 0; i < residentIndexWithOffset; ++i) {
        retval.push(sortedResidentIds[i])
    }
    return retval
}

residentSchema.statics.setName = function(_id, name) {
    return this.findOneAndUpdate({_id}, {$set: {name}}, {new: true})
}

residentSchema.statics.setSurname = function(_id, surname) {
    return this.findOneAndUpdate({_id}, {$set: {surname}}, {new: true})
}

export default mongoose.model('residents', residentSchema)
