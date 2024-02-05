const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cron = require('node-cron')
const DocumentService = require('./services/document-service.js')

const config = require('./config')
const router = require('./router')

const errorMiddleware = require('./middlewares/error-middleware.js')

const app = express()

app.use(bodyParser.json())
app.use(cookieParser())
app.use(router)

app.use(errorMiddleware)

cron.schedule('0 10 * * *', async () => {
  try {
    await DocumentService.excel()
    console.log('Excel report sent successfully.');
  } catch (error) {
    console.error('Error sending Excel report:', error);
  }
})

const connectToDb = async () => {
  try {
    await mongoose.connect(config.DB_URL)

    console.log('Connected to DB')
  } catch (error) {
    console.log('Failer connect to DB', error)
  }
}

connectToDb()

module.exports = app
