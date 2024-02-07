const express = require('express')
const bodyParser = require('body-parser')
const logger = require('./middleware/logger')
const postRoutes = require('./routes/entity')

const app = express()
app.use(bodyParser.json())

app.use(logger)
app.use('/api', postRoutes)

module.exports = app
