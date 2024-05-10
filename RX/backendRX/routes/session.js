var express = require('express');
var router = express.Router();

// just for checking
router.get('/', function(req, res) {
    res.send('You have accessed the test route123!');
});

router.post('/newsession', function(req, res) {
    console.log('at the TX---server side -> Request body:\n', req.body);
    let validation = {
        serverIP: true,
        port: true,
        path: true,
        success: true
    };
    if(!checkIpAddress(req.body.serverIP)) validation = {...validation, serverIP: false, success: false};
    if(!checkPortNumber(req.body.port)) validation = {...validation, port: false, success: false};
    if(!checkPath(req.body.path)) validation = {...validation, path: false, success: false};
    if (validation.success) {
        console.log("at the TX---server side -> validation success!");
        return res.status(200).send("ok");
    } else {
        console.log("at the TX---server side -> erros with the validation...");
        delete validation.success;
        return res.status(400).send(validation);
    };
});


// validation functions

function checkIpAddress(ip) {
    // Regular expression to validate IP address
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
}

function checkPortNumber(port) {
    // Regular expression to validate port number
    const portRegex = /^(?:(?:1\d{3}|[1-9]\d{0,3})|(?:(?:[1-5]?\d{4})|(?:[1-5]\d{3})|(?:[1-6]\d{2})|(?:[1-6]\d)|(?:[1-5]))|(?:(?:6[0-4]\d{2})|(?:65[0-4]\d)|(?:655[0-2])|(?:6553[0-5])))$/;
    return portRegex.test(port);
}

function checkPath(path) {
    return path != '';
}

module.exports = router;