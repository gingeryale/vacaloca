var mysql = require('promise-mysql');

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    connectionLimit: 10
});

 
var myDbHelper = { 
    createDBAndTables: function () { 
        pool.query(`CREATE DATABASE IF NOT EXISTS travel`).then(data => {
            console.log(data);
            let createUsers = `
                CREATE TABLE IF NOT EXISTS travel.users (id INT AUTO_INCREMENT PRIMARY KEY, 
                user_fname VARCHAR(255),user_lname VARCHAR(255),user_name VARCHAR(255),
                user_pass VARCHAR(255))`;
            pool.query(createUsers).then(data => {
                console.log(data);
            });
            let createVacations = `CREATE TABLE IF NOT EXISTS travel.vacations (id INT AUTO_INCREMENT PRIMARY KEY, 
                vaca_desc VARCHAR(128), vaca_price INT(16), vaca_in VARCHAR(16), 
                vaca_out VARCHAR(16), vaca_img LONGBLOB)`;
            pool.query(createVacations).then(data => {
                console.log(data);
            });
            let createCombo = `CREATE TABLE user_vaca (
                user_id INTEGER NOT NULL,
                vaca_id INTEGER NOT NULL,
                FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE RESTRICT ON UPDATE CASCADE,
                FOREIGN KEY (vaca_id) REFERENCES vaca (id) ON DELETE RESTRICT ON UPDATE CASCADE,
                PRIMARY KEY (user_id, vaca_id)
            )`;
            pool.query(createCombo).then(data => {
                console.log(data);
            });
        }); 
    }, 
    myPool: pool
}
 
module.exports = myDbHelper;
