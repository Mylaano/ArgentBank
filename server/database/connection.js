const mongoose = require('mongoose')
const databaseUrl =
  //process.env.DATABASE_URL || 'mongodb+srv://userdb:password123@argentbankdb.6fsxida.mongodb.net'
  process.env.DATABASE_URL || 'mongodb://localhost:27017/argentBankDB'

module.exports = async () => {
  try {
    await mongoose.connect(databaseUrl, { useNewUrlParser: true })
    console.log('Database successfully connected')
  } catch (error) {
    console.error(`Database Connectivity Error: ${error}`)
    throw new Error(error)
  }
}
