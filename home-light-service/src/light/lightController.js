const express = require('express');
const router = express.Router();

const Gpio = require('onoff').Gpio;
const led = new Gpio(4, 'out');

let ledStatus = 0;

// #region Actions

router.get('/', function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    res.send(getResponseModel());
})

router.post('/:enable', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    setLed(req.params.enable);

    res.send(getResponseModel());
});

// #endregion Actions

function setLed(enable) {
    if (enable === '1') {
        updateLedStateToEnabled();

    } else if (enable === '0') {
        updateLedStateToDisabled()
    }

    updateLedState();
}

function updateLedStateToEnabled() {
    ledStatus = 1;
}

function updateLedStateToDisabled() {
    ledStatus = 0;
}

function updateLedState() {
    console.log(`update ledStatus=${ledStatus}`);
    led.writeSync(ledStatus);
}

function getResponseModel() {
    return { success: true, ledStatus };
}

module.exports = router;