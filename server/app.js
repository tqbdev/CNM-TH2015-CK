const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const {
  sequelize
} = require('./models')
const config = require('./config/config')

// const adminRoute = require('./routes/adminRoute')
// const driverRoute = require('./routes/driverRoute')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(cors())

// app.use('/admin', adminRoute)
// app.use('/drivers', driverRoute)

require('./passport')

sequelize.sync({
    force: false
  })
  .then(() => {
    app.listen(config.PORT)
    console.log(`Server started on port ${config.PORT}`)
  })

module.exports = app;
