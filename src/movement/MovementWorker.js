const { parentPort } = require('worker_threads');
// const GpioService = require('../gpio/gpio.service');
const MouseHallListener = require('./MouseHallListener');
const MovementService = require('./MovementService');
parentPort.once('message', message => handleInputMessage(message));

// const gpioService = new GpioService();
const movementService = new MovementService();
const mouseHallListener = new MouseHallListener(movementService)
mouseHallListener.run();

movementService.setOnAngleReachedCallback(30, angle => {
    // gpioService.tryCommandMotor('turn off')

    console.log(`Angle reached: ${angle}`);
    console.log("Resuming motor...");

    // gpioService.tryCommandMotor('turn on');

    movementService.setOnAngleReachedCallback(40, angle => {
        // gpioService.tryCommandMotor('turn off')

        console.log(`Angle reached: ${angle}`);
        console.log("Resuming motor...");
    });
});



function handleInputMessage(message) {
    postOutputMessage({ pong: message })
}

function postOutputMessage(message) {
    parentPort.postMessage(message)
}