const express = require('express')
const bodyParser = require('body-parser')
const postRoutes = require('./routes/entity')

const app = express()
app.use(bodyParser.json())

app.use('/api', postRoutes)

module.exports = app
