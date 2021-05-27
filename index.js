require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')

const router = require('./routes/index')

mongoose.connect(process.env.MONGO_URL, {
    dbName: process.env.MONGO_DB || 'test',
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, err => {
    if (err) { throw new Error(err) }
    console.info('Connected to MongoDB')
  })
  
  const app = express()
    .use(cors())
    .use(morgan('combined'))
    .use(express.json())
    .use('/api', router)
  
  app.listen( process.env.PORT , (err) => {
    if (err) { throw new Error(err) }
    console.info('>'.repeat(40))
    console.info('Reboot Server life')
    console.info('PORT: localhost:', process.env.PORT)
    console.info('>'.repeat(40) + '\n')
  })