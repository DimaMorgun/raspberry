const express = require('express');
const router = express.Router();

const path = require('path');

// #region Actions

router.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');

    res.sendFile(path.join(__dirname, './client.html'));
})

// #endregion Actions

module.exports = router;