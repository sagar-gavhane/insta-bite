import mongoose from 'mongoose'

let isConnected = -1

async function dbConnect() {
  if (isConnected !== -1) return

  const { MONGODB_URI = 'mongodb://localhost:27017/insta_bite' } = process.env

  if (!MONGODB_URI) {
    throw new Error(
      'MongooseError: The `uri` parameter to `openUri()` must be a string, got "undefined"'
    )
  }

  const db = await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    autoIndex: true,
  })

  isConnected = db.connections[0].readyState
}

export default dbConnect
