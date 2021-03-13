const GpioService = require("./gpio.service");

module.exports = (app) => {
    const gpioService = new GpioService();

    app.post('/setup', async (req, res) => {
        try {
            const gpioResult = await gpioService.trySetupGpioPins();
            returnGpioResult(gpioResult, res);
        } catch (e) {
            returnInternalServerErrorOnUnexpectedError(e, res);
        }
    });

    app.post('/motor', async (req, res) => {
        try {
            const command = req.body.command;

            if (returnBadRequestIfMissingCommand(command, res)) {
                return;
            }

            const gpioResult = await gpioService.tryCommandMotor(command);
            returnGpioResult(gpioResult, res);
        } catch (e) {
            returnInternalServerErrorOnUnexpectedError(e, res);
        }
    });

    app.post('/drier', async (req, res) => {
        try {
            const command = req.body.command;

            if (returnBadRequestIfMissingCommand(command, res)) {
                return;
            }

            const gpioResult = await gpioService.tryCommandDrier(command);
            returnGpioResult(gpioResult, res);
        } catch (e) {
            returnInternalServerErrorOnUnexpectedError(e, res);
        }
    });

    app.post('/painter', async (req, res) => {
        try {
            const command = req.body.command;

            if (returnBadRequestIfMissingCommand(command, res)) {
                return;
            }

            const gpioResult = await gpioService.tryCommandPainter(command);
            returnGpioResult(gpioResult, res);
        } catch (e) {
            returnInternalServerErrorOnUnexpectedError(e, res);
        }
    });

    const returnBadRequestIfMissingCommand = (command, res) => {
        if (!command) {
            res.status(400)
                .json({ success: false, message: 'A command is required in the request body!' });
            return true;
        }

        return false;
    }

    const returnGpioResult = (gpioResult, res) => {
        res.status(gpioResult.isSuccess ? 200 : 500)
            .json({ success: gpioResult.isSuccess, message: gpioResult.message });
    }

    const returnInternalServerErrorOnUnexpectedError = (e, res) => {
        res.status(500).json({ success: false, message: e });
    }

    return app;
};