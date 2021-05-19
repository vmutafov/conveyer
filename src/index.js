const express = require('express')
const app = express()
const port = 3000

const MovementDetector = require('./movement/MouseHallListener');
const MovementService = require('./movement/MovementService');

app.use(express.json());

const router = express.Router()
const gpioRoutes = require('./gpio/gpio.routes')(router, {});
app.use('/api/gpio', gpioRoutes)

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })


const { Worker } = require('worker_threads');

const worker = new Worker('./src/movement/MovementWorker.js');
worker.on('message', message => handleWorkerMessage(message)); // receive message from worker      
postWorkerMessage({
  angle: "120"
})

function handleWorkerMessage(message) {
  console.log(message)
}

function postWorkerMessage(message) {
  worker.postMessage(message); 
}