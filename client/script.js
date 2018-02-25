if (!navigator.bluetooth) {
    alert('You must use a Web Bluetooth enabled browser');
} else {
    let currentState = 0;
    const encoder = new TextEncoder('utf-8')

    document.querySelector('#connect').addEventListener('click', async () => {
        const serviceUuid = '764ca00c-1997-11e8-accf-0ed5f89f718b';
        const characteristicUuid = '60d0c9a2-199b-11e8-accf-0ed5f89f718b';

        const characteristic = await navigator.bluetooth.requestDevice({filters: [{services: [serviceUuid]}]}).then(device => {
                return device.gatt.connect();
            }).then(server => {
                return server.getPrimaryService(serviceUuid);
            }).then(service => {
                return service.getCharacteristic(characteristicUuid);
            })

        currentState = await characteristic.readValue().then((value) => {
            return !!parseInt(value.getUint8(0));
        });

        document.querySelector('#state').innerText = currentState ? 'On' : 'Off';

        document.querySelector('#toggle').addEventListener('click', () => {
            const newState = currentState ? '0' : '1';
            characteristic.writeValue(encoder.encode(newState)).then(_ => {
                currentState = !currentState;
                document.querySelector('#state').innerText = currentState ? 'On' : 'Off';
            })
            .catch(error => { console.log(error); });
        });
    });
}
