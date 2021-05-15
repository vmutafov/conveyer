module.exports = class MovementService {

    constructor() {
        this.steps = 0;
        this.totalSteps = 0;
        this.hallSensorPasses = 0;
    }

    onHallCallbackReached() {
        this.totalSteps = this.steps;
        this.steps = 0;
        this.hallSensorPasses += 1;
    }

    onMovement(dx) {
        this.steps += dx;
    }

    getAngle() {
        // if (this._isNotCalibrated()) {
        //     throw new Error("Not calibrated!");
        // }

        return this._constrainAngle_0_360(this.steps * 360.0 / this.totalSteps);
    }

    _constrainAngle_0_360(dx) {
        let constrainedX = dx % 360.0;
        
        if (constrainedX < 0) {
            constrainedX += 360.0;
        }

        return constrainedX;
    }

    _isNotCalibrated() {
        return this.hallSensorPasses < 2;
    }
}