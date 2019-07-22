var express = require('express');
var router = express.Router(); 
var myDbHelper = require('../helps/db'); 

var pool= myDbHelper.myPool;

router.post('/login', async (req, res, next)=> {
    let name=req.body.name;
    let pass=req.body.pass;
    let userArr = 
    await pool.query(`SELECT * FROM travel.users WHERE user_name='${name}' AND user_pass='${pass}'`); 
    if(userArr.length > 0){
        req.session.connectedUser = userArr[0];
        res.json({msg:"OK", name:`${req.session.connectedUser.user_fname}`});
    }else{
        res.json({msg:"NOT CONNECTED"});
    }
}); 


// session cookie
router.get('/api', async function (req, res, next) { 
    if(req.session.connectedUser){
        res.json({
            id:req.session.connectedUser.id,
            fname: req.session.connectedUser.user_fname,
            username: req.session.connectedUser.user_name,
            }); 
    } else {
        res.json({msg:"not connected"});
    }
}); 


// all DB usernames check for duplicates
router.get('/check', async function (req, res, next) { 
    let result = await pool.query('SELECT user_name FROM  travel.users'); 
    res.json(result); 
}); 



// get everything from both tables
router.get('/show', async function(req,res,next){
    if(req.session.connectedUser){
        let result = await pool.query(`SELECT * FROM travel.vacations 
        left JOIN travel.subscribers ON vacations.id = subscribers.vid and 
        subscribers.uid='${req.session.connectedUser.id}' ORDER BY subscribers.uid DESC`);
        res.json(result);
    } else {
        res.redirect('/login');
    }
   
});


// get all users
router.get('/', async function (req, res, next) { 
    if(req.session.connectedUser){
        let result = await pool.query('SELECT * FROM travel.users'); 
        res.json(result); 
    } else {
        res.redirect('/login');
    }
   
}); 

// user by id
router.get('/:id', async function (req, res, next) { 
    if(req.session.connectedUser){
    let result = await pool.query(`SELECT * FROM travel.users WHERE id=${req.params.id}`); 
    res.json(result); 
    } else {
        res.redirect('/login');
    }
}); 

// add register new user
router.post('/register', async function (req, res, next) { 
    let insertQuery= ` INSERT INTO  travel.users (user_fname, user_lname, user_name, user_pass) 
    VALUES ('${req.body.fname}','${req.body.lname}','${req.body.name}','${req.body.pass}')`; 
    let result = await pool.query(insertQuery); 
    res.json({msg:"OK", name:`${req.body.fname}`}); 
}); 




// GET list all vacation subscribers by fk
router.get('/follow/all', async function (req, res, next) { 
    if(req.session.connectedUser){
    let result = await pool.query(`SELECT * FROM travel.subscribers`); 
    res.json(result); } else {
        res.redirect('/login');
    }
}); 


// GET all follow vacation by user id
router.get('/follow/u/', async function (req, res, next) { 
    if(req.session.connectedUser){
        let result = await pool.query(`SELECT * FROM travel.vacations 
        CROSS JOIN travel.subscribers ON travel.vacations.id = travel.subscribers.vid 
        WHERE travel.subscribers.uid='${req.session.connectedUser.id}' `);
    res.json(result); 
    } else {
        res.redirect('/login');
    }
}); 


// test only for dev uid=8
// router.get('/follow/t/', async function (req, res, next) { 
//     let result = await pool.query(`SELECT * FROM travel.vacations 
//     CROSS JOIN travel.subscribers ON travel.vacations.id = travel.subscribers.vid 
//     WHERE travel.subscribers.uid='12' `);
// res.json(result); 
// }); 

// add a new user follow to vacation
router.post('/subs/:id', async function (req, res, next) { 
    if(req.session.connectedUser){
    let insertQuery= `INSERT into travel.subscribers(uid,vid) 
    VALUES ('${req.session.connectedUser.id}', '${req.params.id}')`;
    console.log("param id: => "+req.params.id);
    let result = await pool.query(insertQuery); 
    res.status(200).json({ msg: 'OK' });
    } else {
        res.redirect('/login');
    }
}); 



// delete FOLLOW of VACation
router.delete('/subs/:vid', async function (req, res, next) { 
    if(req.session.connectedUser){ 
    let result = await pool.query(`DELETE FROM travel.subscribers 
    WHERE vid='${req.params.vid}'  AND 
    uid='${req.session.connectedUser.id}'`);  
    res.status(200).json({ msg: 'OK' });
    } else {
        res.redirect('/');
    }
});


// get grouped by raw vacation count+id
router.get('/subs/rawcount', async function (req, res, next) { 
    if(req.session.connectedUser){
    let result = await pool.query(`SELECT vid, COUNT(*) as vcount 
    FROM travel.subscribers 
    GROUP BY vid 
    ORDER BY vcount DESC`); 
    res.json(result); 
    } else {
       res.redirect('/login');
    }
}); 

// get names of vactions
router.get('/subs/report', async function (req, res, next) { 
    if(req.session.connectedUser){
    let result = await pool.query(`SELECT 
    vacations.id, vacations.vac_destination, count(subscribers.vid) as trending 
    from travel.subscribers left join travel.vacations on 
    (subscribers.vid = vacations.id) 
    group by travel.vacations.vac_destination 
    ORDER BY trending DESC`); 
    res.json(result); }
    else {
        res.redirect('/');
    }
}); 


module.exports = router;
