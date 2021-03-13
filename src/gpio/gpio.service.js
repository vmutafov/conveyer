const GpioResult = require("./gpio.result");
const Gpio = require('rpi-gpio').promise;
const GpioIds = require('./gpio.id');

const TURN_ON_COMMAND = 'turn on';
const TURN_OFF_COMMAND = 'turn off';

module.exports = class GpioService {
    async trySetupGpioPins() {
        try {
            await Gpio.setup(GpioIds.motor, Gpio.DIR_LOW);
            // TODO: setup other pins

            return new GpioResult(true, "Successfully setup gpio pins!");
        } catch (e) {
            return new GpioResult(false, `Could not setup gpio pins because of: ${e.message || e.toString()}!`);
        }
    }

    async tryCommandMotor(command) {
        return await this.executeCommand(GpioIds.motor, command);
    }

    async tryCommandDrier(command) {
        return await this.executeCommand(GpioIds.drierGun, command);
    }

    async tryCommandPainter(command) {
        return await this.executeCommand(GpioIds.paintGun, command);
    }

    async executeCommand(gpioId, command) {
        if (command !== TURN_OFF_COMMAND && command !== TURN_ON_COMMAND) return this.invalidCommandGpioResult(command);
        
        try {
            if (command === TURN_OFF_COMMAND) {
                await Gpio.write(gpioId, true);
            } else if (command === TURN_ON_COMMAND) {
                await Gpio.write(gpioId, false);
            }
        } catch (e) {
            return new GpioResult(false, `Error writing gpio: ${gpioId} because of: ${e.message || e.toString()}`);
        }

        return new GpioResult(true, `Successfully executed command: ${JSON.stringify(command)}  against pin: ${gpioId}`);
    }

    invalidCommandGpioResult(command) {
        return new GpioResult(false, `Invalid command provided: ${JSON.stringify(command)}`);
    }
}