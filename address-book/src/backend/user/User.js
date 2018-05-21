import mongoose from "mongoose"
import 'mongoose-type-email'
import mongooseHidden from 'mongoose-hidden'
import _ from 'lodash'
import bcrypt from 'bcrypt'

export const userCollectionName = 'users'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        hide: true,
    }
})

userSchema.plugin(mongooseHidden(), {hidden: {_id: false}})
userSchema.index({email: 1}, {unique: true})

userSchema.statics.createChecked = async function(email, nickname, password) {
    if (!_.isString(email)) {
        throw {message: 'invalid email'}
    }
    email = email.toLowerCase()

    if ((await this.find({email}).count()) > 0) {
        throw {message: 'email already in use'}
    }

    try {
        const salt = await bcrypt.genSalt(10)
        password = await bcrypt.hash(password, salt)
    } catch (e) {
        console.log(e)
        throw {message: 'error with password'}
    }

    const retval = new this({email, nickname, password})
    await retval.validate()
    return retval
}

userSchema.statics.findAuthenticated = async function(email, password) {
    if (!_.isString(email) || _.isEmpty(email)) {
        throw {message: 'invalid email'}
    }
    if (!_.isString(password) || _.isEmpty(password)) {
        throw {message: 'invalid password'}
    }
    const user = await this.findOne({email: email})
    if (!user) {
        throw {message: 'invalid user'}
    }
    if (!await bcrypt.compare(password, user.password)) {
        throw {message: 'invalid password'}
    }

    return user
}

userSchema.statics.list = async function() {
    return await this.find({})
}

export default mongoose.model(userCollectionName, userSchema)