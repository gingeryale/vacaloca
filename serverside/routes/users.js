var express = require('express');
var router = express.Router(); 
var myDbHelper = require('../helps/db'); 

var pool= myDbHelper.myPool;

// get all users
router.get('/', async function (req, res, next) { 
    let result = await pool.query('SELECT * FROM travel.users'); 
    res.json(result); 
}); 

// user by id
router.get('/:id', async function (req, res, next) { 
    let result = await pool.query(`SELECT * FROM travel.users WHERE id=${req.params.id}`); 
    res.json(result); 
}); 

// add new user
router.post('/', async function (req, res, next) { 
    let insertQuery= ` INSERT INTO  travel.users (user_fname, user_lname, user_name, user_pass) 
    VALUES ('${req.body.fname}','${req.body.lname}','${req.body.name}','${req.body.pass}')`; 
    let result = await pool.query(insertQuery); 
    res.json(result); 
}); 



// GET all subs
router.get('/follow/all', async function (req, res, next) { 
    let result = await pool.query(`SELECT * FROM travel.subscribers`); 
    res.json(result); 
}); 

// POST new vacation subscriber
router.post('/subs', async function (req, res, next) { 
    let insertQuery= `INSERT INTO  travel.subscribers (uid, vid) 
    VALUES (${req.body.uid},${req.body.vid})`; 
    let result = await pool.query(insertQuery); 
    res.json(result); 
}); 


// get grouped by vacation count
router.get('/subs/rawcount', async function (req, res, next) { 
    let result = await pool.query(`SELECT vid, COUNT(*) as vcount 
    FROM travel.subscribers 
    GROUP BY vid 
    ORDER BY vcount DESC`); 
    res.json(result); 
}); 

// get names of vactions with 1 value for null
router.get('/subs/report1', async function (req, res, next) { 
    let result = await pool.query(`SELECT vacations.vac_destination, vacations.id, 
    count(*) as number_of_followers 
    from travel.vacations 
    left join travel.subscribers on (vacations.id = subscribers.vid) 
    group by vacations.vac_destination
    ORDER BY number_of_followers DESC`); 
    res.json(result); 
}); 

// get names of vactions
router.get('/subs/report', async function (req, res, next) { 
    let result = await pool.query(`SELECT 
    vacations.id, vacations.vac_destination, count(subscribers.vid) as trending 
    from travel.subscribers left join travel.vacations on 
    (subscribers.vid = vacations.id) 
    group by travel.vacations.vac_destination 
    ORDER BY trending DESC`); 
    res.json(result); 
}); 




module.exports = router;
