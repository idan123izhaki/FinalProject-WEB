var express = require('express');
var mysql = require('mysql');
require('dotenv').config();

const pool  = mysql.createPool({
    connectionLimit: process.env.MYSQL_CONN_LIMIT,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB
});

// handle query
async function dbconn(sql, params=[]) {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });
};

module.exports = dbconn;