import mongoose from 'mongoose'

export const TEST_DB_NAME = 'putzplan-test'

export default async function setup() {
    const {ObjectId} = mongoose.Types

    await mongoose.connect(`mongodb://localhost/${TEST_DB_NAME}`)
    const {db} = mongoose.connection

    const residents = db.collection('residents')
    await residents.remove({})
    await residents.insertMany([
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

    const tasks = db.collection('tasks')
    await tasks.remove({})
    await tasks.insertMany([
        {
            _id: new ObjectId('5ade08e5eaf1423599d5ce9c'),
            description: 'clean epstein drive',
            firstResident: '5ade08d55af1423599d5ce9d',
            startDate: new Date('2017-01-26 09:11:17.111Z'),
            lastDone: new Date('2016-01-26 09:11:17.111Z'),
        },
    ])
}
