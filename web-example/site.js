const express = require('express');
const app = express();
const port = 5000;

const gpio = require('onoff').Gpio;
const led = new gpio(4, 'out');

app.get('/', (req, res) => {
    res.send('Good evening, we are from Ukraine!');
});

app.get('/light/:enable', (req, res) => {
    setLed(req.params.enable);

    res.send({ success: true });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

function setLed(enable) {
    if (enable === '1') {
        console.log(`Turn on with ${enable}`);

        led.writeSync(1);
    } else if (enable === '0') {
        console.log(`Turn off with ${enable}`);

        led.writeSync(0);
    } else {
        console.log(`Nothing with ${enable}`);
    }
}
