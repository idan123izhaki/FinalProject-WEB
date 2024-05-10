var express = require('express');
var router = express.Router();
var dbconn = require("../common/dbconnection");

// just for checking
router.get('/', function(req, res) {
    res.send('You have accessed the test route123!');
});

// display all the sessions from the database
router.get('/sessionpanel', function(req, res) {
    res.send('This route is working!');
});

router.get('/txports', async function(req, res) {
    console.log("At the get tx ports list function");
    let txPortsList = await dbconn(`
    SELECT tx_ports.port_number
    FROM tx_ports
    WHERE tx_ports.port_number NOT IN (SELECT port_number FROM tx_sessions)`);
    console.log(txPortsList);
    return res.status(200).send(txPortsList);
});

router.get('/rxports', async function(req, res) {
    console.log("At the get rx ports list function");
    let rxPortsList = await dbconn(`
    SELECT rx_ports.port_number
    FROM rx_ports
    WHERE rx_ports.port_number NOT IN (SELECT server_port_number FROM tx_sessions)`);
    console.log(rxPortsList);
    return res.status(200).send(rxPortsList);
});

router.post('/newsession' , async function(req, res) {
    console.log('at the TX---server side -> Request body:\n', req.body);
    let errors = {
        name: "Invalid session name",
        serverIP: "Invalid server ip",
        port: "The source port is already in use",
        serverPort: "The server port is already in use",
        path: "Invalid path",
        chunkSize: "Invalid chunk size",
        symbolSize: "Invalid symbol size",
        overhead: "Invalid overhead number"
    };
    let validation = {
        name: true,
        serverIP: true,
        port: true,
        serverPort: true,
        path: true,
        chunkSize: true,
        symbolSize: true,
        overhead: true,
        success: true
    };
    let finalErrors = [];
    if(!checkSessionName(req.body.name)) {validation = {...validation, name: false, success: false}; finalErrors.push(errors.name);}
    if(!checkIpAddress(req.body.serverIP)) {validation = {...validation, serverIP: false, success: false}; finalErrors.push(errors.serverIP);}
    if(!await checkTxPortNumber(req.body.port)) {validation = {...validation, port: false, success: false}; finalErrors.push(errors.port);}
    if(!await checkRxPortNumber(req.body.serverPort)) {validation = {...validation, serverPort: false, success: false}; finalErrors.push(errors.serverPort);}
    if(!checkPath(req.body.path)) {validation = {...validation, path: false, success: false}; finalErrors.push(errors.path);}
    if(!checkChunkSize(req.body.chunkSize)) {validation = {...validation, chunkSize: false, success: false}; finalErrors.push(errors.chunkSize);}
    if(!checkSymbolSize(req.body.symbolSize)) {validation = {...validation, symbolSize: false, success: false}; finalErrors.push(errors.symbolSize);}
    if(!checkOverhead(req.body.overhead)) {validation = {...validation, overhead: false, success: false}; finalErrors.push(errors.overhead);}
    console.log(validation);
    if (validation.success) {
        console.log("at the TX---server side -> validation success!");
        // send here the values to database (as a object)
        let data = await dbconn(`
        INSERT INTO tx_sessions (session_name, remote_server_ip, port_number, server_port_number, path, chunk_size, symbol_size, overhead)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [req.body.name, req.body.serverIP, req.body.port, req.body.serverPort, req.body.path,
             req.body.chunkSize, req.body.symbolSize, req.body.overhead])
        // send here the values to cpp service
        console.log('INSERT NEW SESSION SUCCESSFULLY!');
        return res.status(200).send("ok");
    } else {
        console.log("at the TX---server side -> erros with the validation...");

        delete validation.success;
        return res.status(400).send(finalErrors);
    };
});


router.get('/allsessions', async function(req, res) {
    console.log("At the get all sessions route.");
    let sessions = await dbconn(`SELECT * FROM tx_sessions`);
    console.log(sessions);
    return res.status(200).send(sessions);
});


// some examples

// router.post('/new', async function(req, res) {
//     let data = await dbconn(`
//     INSERT INTO categories (name, description, catImage)
//     VALUES (?, ?, ?)`,
//     [req.body.name, req.body.description, req.body.catImage]);
//     console.log('INSERT SUCCESSFUL!');
//     return res.status(200).send(data);
//   });

//   router.get('/list', async function(req, res) {
//     let data = await dbconn('SELECT id, name FROM categories');
//     console.log(data);
//     return res.status(200).send(data);
//   });





// validation functions

function checkSessionName(name) {
    return (name != '' && name.length <= 20);
}

function checkIpAddress(ip) {
    // Regular expression to validate IP address
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
}

async function checkTxPortNumber(port) {
    // checking of the port number is existing at the DB
    // all the avilable ports num
    let txPortsList = await dbconn(`
    SELECT tx_ports.port_number
    FROM tx_ports
    WHERE tx_ports.port_number NOT IN (SELECT port_number FROM tx_sessions)`);
    let data = txPortsList.map(obj => Object.values(obj)[0]);
    console.log(data);
    console.log("port number:" , port);
    return data.includes(parseInt(port));
}

async function checkRxPortNumber(port) {
    // checking of the port number is existing at the DB
    let rxPortsList = await dbconn(`
    SELECT rx_ports.port_number
    FROM rx_ports
    WHERE rx_ports.port_number NOT IN (SELECT server_port_number FROM tx_sessions)`);
    let data = rxPortsList.map(obj => Object.values(obj)[0]);
    console.log(data);
    console.log("port number:" , port);
    return data.includes(parseInt(port));
}

function checkPath(path) {
    return path != '';
}

function checkChunkSize(chunkSize) {
    return (chunkSize > 0 && chunkSize <= 1000000);
}

function checkSymbolSize(symbolSize) {
    return (symbolSize > 0 && symbolSize <= 100000);
}

function checkOverhead(overhead) {
    return (overhead > 0 && overhead <= 5000);
}

module.exports = router;