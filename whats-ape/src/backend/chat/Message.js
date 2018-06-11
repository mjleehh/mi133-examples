import mongoose, {Schema} from "mongoose"
import 'mongoose-type-email'
import mongooseHidden from 'mongoose-hidden'
import {User, userCollectionName} from 'backend/user'

const messagesCollectionName = 'messages'

const messageSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: userCollectionName,
    },
    to: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: userCollectionName,
    },
    msg: {
        type: String,
        required: true,
    },
    sent: {
        type: Date,
        required: true,
    }
})

messageSchema.plugin(mongooseHidden(), {hidden: {_id: false}})
messageSchema.index({from: 1, to: 1}, {unique: false})

messageSchema.statics.listChats = async function() {
    const users = await User.find({})
    return users.map(user => user._id)
}

messageSchema.statics.get = async function(messageId) {
    const retval = await this.findOneById(messageId)
    if (retval == null) {
        throw {message: 'invalid message ID'}
    }
    return retval
}

messageSchema.statics.createChecked = async function(from, to, msg) {
    const retval = new this({from, to, msg, sent: new Date()})
    await retval.validate()
    if (await User.find({_id: user}).count() < 1) {
        throw {message: 'invalid user'}
    }
    if (await User.find({_id: other}).count() < 1) {
        throw {message: 'invalid recipient'}
    }
    return retval
}

messageSchema.statics.getChat = async function(user, other) {
    const from = await this.find({from: user, to: other})
    const to = await this.find({to: other, from: user})
    return []
}

export default mongoose.model(messagesCollectionName, messageSchema)
