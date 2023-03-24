import mongoose from 'mongoose'

export const connectDatabase = () => {
    mongoose
        .connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((data) =>
            console.log(`Connection success to ${data.connection.host}`)
        )
}
