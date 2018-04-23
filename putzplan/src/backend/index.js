import mongoose from 'mongoose'
import app from './endpoints'

async function main() {
    await mongoose.connect('mongodb://localhost/putzplan-test')

    app.listen(3000)
}

main()
