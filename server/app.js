const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const {
  sequelize
} = require('./models')
const config = require('./config/config')

const commonRoute = require('./routes/common')
const staffRoute = require('./routes/staff')
const userRoute = require('./routes/user')
const accountRoute = require('./routes/account')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(cors())

app.use(commonRoute)
app.use('/admin', staffRoute)
app.use('/user', userRoute)
app.use('/accounts', accountRoute)

require('./passport')

sequelize.sync({
    force: false
  })
  .then(() => {
    app.listen(config.PORT)
    console.log(`Server started on port ${config.PORT}`)
  })

module.exports = app;
