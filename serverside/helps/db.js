var mysql = require('promise-mysql');

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    connectionLimit: 10,
    port: 3306
});


var myDbHelper = {
    createDBAndTables: function () {
        pool.query(`CREATE DATABASE IF NOT EXISTS travel`).then(data => {
            console.log(data);
            let createUsers = `
                CREATE TABLE IF NOT EXISTS travel.users (id INT(11) AUTO_INCREMENT PRIMARY KEY, 
                user_fname VARCHAR(255),user_lname VARCHAR(255),user_name VARCHAR(255),
                user_pass VARCHAR(255))`;
            pool.query(createUsers).then(data => {
            });
            let createVacations = `CREATE TABLE IF NOT EXISTS travel.vacations (id INT(11) AUTO_INCREMENT PRIMARY KEY, 
                vac_destination VARCHAR(32), vac_desc VARCHAR(128), vac_price INT(16), vac_checkin VARCHAR(16), 
                vac_checkout VARCHAR(16), vac_img LONGTEXT)`;
            pool.query(createVacations).then(data => {
            });
            let createSubs = `CREATE TABLE IF NOT EXISTS travel.subscribers 
            (sid INT(11) AUTO_INCREMENT PRIMARY KEY,
            uid int,
            vid int,
            FOREIGN KEY (uid) REFERENCES travel.users(id) ON DELETE CASCADE,
            FOREIGN KEY (vid) REFERENCES travel.vacations(id) ON DELETE CASCADE
             )`;
            pool.query(createSubs).then(data => {
            });
        });
    },
    myPool: pool
}

module.exports = myDbHelper;


// ALTER TABLE travel.uservaca ADD FOREIGN KEY (vid) REFERENCES travel.vacations(id);
