module.exports = class MovementService {
    constructor() {
        this.steps = 0;
        this.lastIterationSteps = 0;
        this.hallSensorPasses = 0;
    }

    setOnAngleReachedCallback(angle, onAngleReachedCallback) {
        this.angleToReach = angle;
        this.onAngleReachedCallback = onAngleReachedCallback;
    }

    onHallCallbackReached() {
        this.lastIterationSteps = this.steps;
        this.steps = 0;
        this.hallSensorPasses += 1;
    }

    onMovement(dx) {
        this.steps += dx;
        const currentAngle = this.getAngle();
        // const currentAngle = 30;
        if (this.onAngleReachedCallback && this.angleToReach === currentAngle) {
            this.onAngleReachedCallback(this.angleToReach);
        }
    }

    getAngle() {
        // if (this._isNotCalibrated()) {
        //     throw new Error("Not calibrated!");
        // }

        return this._constrainAngle_0_360(this.steps * 360.0 / this.lastIterationSteps);
    }

    _constrainAngle_0_360(dx) {
        let constrainedX = dx % 360.0;
        
        if (constrainedX < 0) {
            constrainedX += 360.0;
        }

        return Math.round(constrainedX);
    }

    _isNotCalibrated() {
        return this.hallSensorPasses < 2;
    }
}