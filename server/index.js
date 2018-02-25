'use strict';

const bleno = require(`bleno`);
const onOffCharacteristic = require(`./onOffCharacteristic.js`)

bleno.on(`stateChange`, (state) => {
    if (state === `poweredOn`) {
        bleno.startAdvertising('test', ['764ca00c-1997-11e8-accf-0ed5f89f718b']);
    } else {
        bleno.stopAdvertising();
    }
});

bleno.on(`advertisingStart`, (error) => {
    console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));

    if (!error) {
        bleno.setServices([
            new bleno.PrimaryService({
                uuid: '764ca00c-1997-11e8-accf-0ed5f89f718b',
                characteristics: [
                    new onOffCharacteristic()
                ]
            })
        ]);
    }
});
