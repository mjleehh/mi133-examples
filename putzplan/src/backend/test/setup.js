import mongoose from 'mongoose'

export const TEST_DB_NAME = 'putzplan-test'

export default async function setup() {
    const {ObjectId} = mongoose.Types

    await mongoose.connect(`mongodb://localhost/${TEST_DB_NAME}`)
    const {db} = mongoose.connection

    await db.dropDatabase(TEST_DB_NAME)
    await db.collection('residents').insertMany([
        {
            _id: new ObjectId('5ade08d55af1423599d5ce9c'),
            name: 'Chrisjen',
            surname: 'Avasarala',
            createdAt: new Date('2015-08-26 09:11:17.111Z'),
        },
        {
            _id: new ObjectId('5ade08d55af1423599d5ce9d'),
            name: 'Jim',
            surname: 'Holden',
            createdAt: new Date('2014-04-22 12:15:24.157Z'),
        },
        {
            _id: new ObjectId('5ade08d55af1423599d5ce9e'),
            name: 'Julie',
            surname: 'Mao',
            createdAt: new Date('2014-04-22 12:15:24.157Z'),
        },
    ])

    await db.collection('tasks').insertMany([
        {
            _id: new ObjectId('5ade08e5eaf1423599d5ce9c'),
            name: 'clean epstein drive',
            firstResident: '5ade08d55af1423599d5ce9d',
            startDate: new Date('2017-01-26 09:11:17.111Z'),
            lastDone: new Date('2016-01-26 09:11:17.111Z'),
        },
    ])
}
