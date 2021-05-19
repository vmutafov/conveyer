const fs = require('fs');

const fileName = '/dev/input/mice';

const toSigned = (n) => n - ((0x80 & n) << 1);


module.exports = class MouseHallListener {
    constructor(movementService) {
        this.movementService = movementService;
    }

    run() {
        fs.stat(fileName, (err, stats) => {
            if (err) {
                console.log(`Error: ${err.toString()}`);
                return;
            }
    
            const fileSize = stats.size;
            const bytesToRead = 3;
            const position = fileSize - bytesToRead;
            fs.open(fileName, 'r', (errOpen, fd) => {
                if (errOpen) {
                    console.log(`Error open: ${errOpen.toString()}`);
                    return;
                }
    
                let dx = 0;
                let dy = 0;
    
                let isFirstBytes = true;
    
                while (true) {
                    const readBuffer = Buffer.alloc(bytesToRead);
    
                    const bytesRead = fs.readSync(fd, readBuffer, 0, bytesToRead, position);
    
                    if (bytesToRead !== 3) {
                        console.log("not enough bytes");
                    }
    
                    if (isFirstBytes) {
                        isFirstBytes = false;
                    } else {
                        const status = readBuffer[0];
                        dx += toSigned(readBuffer[1]);
                        dy += toSigned(readBuffer[2]);

                        if (parseInt(status) === 12) { // middle mouse button
                            this.movementService.onHallCallbackReached();
                        }

                        this.movementService.onMovement(dx);
    
                        console.log(`Event: Status: ${status}  dx: ${dx}  dy: ${dy}`);
                    }
    
                }
            });
        });
    }
} 
