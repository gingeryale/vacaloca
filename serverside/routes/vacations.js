var express = require('express');
var router = express.Router(); 
var myDbHelper = require('../helps/db'); 

var pool= myDbHelper.myPool;

// get everything vacations
router.get('/', async function (req, res, next) { 
    let result = await pool.query('SELECT * FROM travel.vacations'); 
    res.json(result); 
}); 

// vacation by id
router.get('/:id', async function (req, res, next) { 
    let result = await pool.query(`SELECT * FROM travel.vacations WHERE id=${req.params.id}`); 
    res.json(result); 
}); 

// add new vacation
router.post('/', async function (req, res, next) { 
    let insertQuery= ` INSERT INTO  travel.vacations (vaca_desc, vaca_price, vaca_in, vaca_out, vaca_img) 
    VALUES ('${req.body.vaca_desc}','${req.body.vaca_price}','${req.body.vaca_in}',
    '${req.body.vaca_out}', '${req.body.vaca_img}')`; 
    let result = await pool.query(insertQuery); 
    res.json(result); 
}); 


// all user vacation combos
router.get('/follow', async function (req, res, next) { 
    let result = await pool.query(`SELECT * FROM travel.uservaca WHERE id=${req.params.id}`); 
    res.json(result); 
}); 


// user vacation combo bu vacation id
router.get('/follow/:id', async function (req, res, next) { 
    let result = await pool.query(`SELECT * FROM travel.uservaca WHERE id=${req.params.id}`); 
    res.json(result); 
}); 

module.exports = router;
