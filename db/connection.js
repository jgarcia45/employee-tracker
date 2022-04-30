const mysql = require('mysql2');
//require('dotenv').config();

const db = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: '60DGmO7!54rgXtR',
    database: 'employee_tracker_db'
});

module.exports = db;