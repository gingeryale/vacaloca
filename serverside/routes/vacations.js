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
    if(req.session.user=[0]){
    let insertQuery= ` INSERT INTO  travel.vacations (vac_destination,vac_desc,vac_price,vac_checkin,vac_checkout, vac_img) 
    VALUES ('${req.body.destination}','${req.body.desc}',${req.body.price},'${req.body.checkin}',
    '${req.body.checkout}', '${req.body.img}')`; 
    let result = await pool.query(insertQuery); 
    res.json(result); } else {
        res.redirect('/login');
    }
}); 


module.exports = router;
