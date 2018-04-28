import mongoose from 'mongoose'
import app from './api'

async function main() {
    await mongoose.connect('mongodb://localhost/putzplan-test')

    app.listen(3000)
}

main()
