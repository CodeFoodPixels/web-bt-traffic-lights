'use strict';

const bleno = require(`bleno`);
const util = require('util');
const LED = require(`rpi-ws281x-native`);

const RED = 0xff0000;
const AMBER = 0xffbf00;
const GREEN = 0x00ff00;

class onOffCharacteristic extends bleno.Characteristic {
    constructor() {
        super({
            uuid: '60d0c9a2-199b-11e8-accf-0ed5f89f718b',
            properties: ['read', 'write'],
            value: null
        });

        this._value = false;
        this.pixelData = new Uint32Array(3);

        LED.init(3);

        this.pixelData[0] = 0;
        this.pixelData[1] = 0;
        this.pixelData[2] = RED;
        LED.render(this.pixelData);

        process.on('SIGINT', function () {
            LED.reset();
            process.nextTick(function () { process.exit(0); });
        });
    }

    onReadRequest(offset, callback) {
        callback(this.RESULT_SUCCESS, this._value);
    }

    onWriteRequest(data, offset, withoutResponse, callback) {
        const newVal = !!parseInt(data.toString());

        callback(this.RESULT_SUCCESS);

        if (this._value === false && newVal === true) {
            this.pixelData[0] = 0;
            this.pixelData[1] = AMBER;
            this.pixelData[2] = RED;
            LED.render(this.pixelData);

            setTimeout(() => {
                this.pixelData[0] = GREEN;
                this.pixelData[1] = 0;
                this.pixelData[2] = 0;
                LED.render(this.pixelData);
            }, 2000);
        } else if (this._value === true && newVal === false) {
            this.pixelData[0] = 0;
            this.pixelData[1] = AMBER;
            this.pixelData[2] = 0;
            LED.render(this.pixelData);

            setTimeout(() => {
                this.pixelData[0] = 0;
                this.pixelData[1] = 0;
                this.pixelData[2] = RED;
                LED.render(this.pixelData);
            }, 3000);
        }

        this._value = newVal;
    }
}

module.exports = onOffCharacteristic;
