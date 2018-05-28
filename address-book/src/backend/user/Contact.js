import mongoose, {Schema} from "mongoose"
import 'mongoose-type-email'
import mongooseHidden from 'mongoose-hidden'
import User, {userCollectionName} from './User'

const contactsCollectionName = 'contacts'

const contactSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: userCollectionName,
    },
    contact: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: userCollectionName,
    }
})

contactSchema.plugin(mongooseHidden(), {hidden: {_id: false}})
contactSchema.index({user: 1, contact: 1}, {unique: true})

contactSchema.statics.list = async function() {
    return await this.find({}).select('_id email nickname')
}

contactSchema.statics.createChecked = async function(user, contact) {
    const retval = new this({user, contact})
    await retval.validate()
    if (await User.find({_id: user}).count() < 1) {
        throw {message: 'invalid user'}
    }
    if (await User.find({_id: contact}).count() < 1) {
        throw {message: 'invalid contact'}
    }
    return retval
}

contactSchema.statics.list = async function(user) {
    const list = await this.find({user}).populate('contact').exec()
    return list.map(e => e.contact)
}

contactSchema.statics.get = async function(user, contact) {
    const res  = await this.findOne({user, contact}).populate('contact').exec()
    return res.contact
}

contactSchema.statics.remove = async function(user, contact) {
    const res  = await this.findOneAndRemove({user, contact})
}

export default mongoose.model(contactsCollectionName, contactSchema)
