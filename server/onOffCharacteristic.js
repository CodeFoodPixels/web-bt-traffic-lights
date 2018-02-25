'use strict';

const bleno = require(`bleno`);
const util = require('util');

class onOffCharacteristic extends bleno.Characteristic {
    constructor() {
        super({
            uuid: '60d0c9a2-199b-11e8-accf-0ed5f89f718b',
            properties: ['read', 'write'],
            value: null
        });

        this._value = false;
    }

    onReadRequest(offset, callback) {
        callback(this.RESULT_SUCCESS, this._value);
    }

    onWriteRequest(data, offset, withoutResponse, callback) {
        const newVal = !!parseInt(data.toString());

        callback(this.RESULT_SUCCESS);

        if (this._value === false && newVal === true) {
            console.log('red and amber');

            setTimeout(() => {
                console.log('green')
            }, 2000);
        } else if (this._value === true && newVal === false) {
            console.log('amber');

            setTimeout(() => {
                console.log('red')
            }, 3000);
        }

        this._value = newVal;
    }
}

module.exports = onOffCharacteristic;
