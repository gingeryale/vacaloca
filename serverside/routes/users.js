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
router.post('/follow', async function (req, res, next) { 
    let insertQuery= `INSERT INTO  travel.subscribers (uid, vid) 
    VALUES (${req.body.uid},${req.body.vid})`; 
    let result = await pool.query(insertQuery); 
    res.json(result); 
}); 


// get grouped by vacation count
router.get('/follow/count', async function (req, res, next) { 
    let result = await pool.query(`SELECT vid,COUNT(*) as vcount 
    FROM travel.subscribers 
    GROUP BY vid 
    ORDER BY vid DESC`); 
    res.json(result); 
}); 
module.exports = router;
