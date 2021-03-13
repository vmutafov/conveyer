const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

const router = express.Router()
const gpioRoutes = require('./gpio/gpio.routes')(router, {});
app.use('/api/gpio', gpioRoutes)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})