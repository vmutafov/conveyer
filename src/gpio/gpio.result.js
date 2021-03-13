module.exports = class GpioResult {
    constructor(isSuccess, message) {
        this.isSuccess = isSuccess;
        this.message = message;
    }
}