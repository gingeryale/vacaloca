var express = require('express');
var router = express.Router();
var myDbHelper = require('../helps/db');

var pool = myDbHelper.myPool;

// get everything vacations UNSORTED Not in use for this project
router.get('/', async function (req, res, next) {
    if(req.session.connectedUser){ 
    let result = await pool.query('SELECT * FROM travel.vacations');
    res.json(result);
    } else{
        res.redirect('/login');
    }
});

// vacation by id
router.get('/:id', async function (req, res, next) {
    let result = await pool.query(`SELECT * FROM travel.vacations WHERE id=${req.params.id}`);
    res.json(result);
});

// edit vacation by params id
router.put('/:id', async function (req, res, next) {
    if(req.session.connectedUser){ 
        let insertQuery = `UPDATE travel.vacations SET 
        vac_destination = '${req.body.destination}',
        vac_desc ='${req.body.desc}',
        vac_price =${req.body.price},
        vac_checkin ='${req.body.checkin}',
        vac_checkout ='${req.body.checkout}',
        vac_img ='${req.body.img}'
        WHERE id = ${req.params.id}`;
        let result = await pool.query(insertQuery);
        res.status(200).json({ msg: 'OK' }); 
    } else {
        res.redirect('/login');
    }  
});

// delete by params id
router.delete('/:id', async function (req, res, next) { 
    if(req.session.connectedUser){  
    let result = await pool.query(`DELETE FROM travel.vacations WHERE id=${req.params.id}`);  
    res.status(200).json({ msg: 'OK' });
    } else {
        res.redirect('/');
    }
});


// add new vacation
router.post('/', async function (req, res, next) {
    if(req.session.connectedUser){ 
        let insertQuery = ` INSERT INTO  travel.vacations (vac_destination,vac_desc,vac_price,vac_checkin,vac_checkout, vac_img) 
    VALUES ('${req.body.destination}','${req.body.desc}',${req.body.price},'${req.body.checkin}',
    '${req.body.checkout}', '${req.body.img}')`;
        let result = await pool.query(insertQuery);
        res.status(200).json({ msg: 'OK' });
    } else {
        res.redirect('/');
    }
});


module.exports = router;
