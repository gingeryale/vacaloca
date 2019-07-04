var express = require('express');
var router = express.Router(); 
var myDbHelper = require('../helps/db'); 

var pool= myDbHelper.myPool;

// login cookie
//router.post('/login', async function (req, res, next) { 
//    let result = await pool.query(`SELECT * FROM travel.users WHERE user.name = ${req.body.user}`);
//    if(result.length > 0){
//        req.session.user = results[0];
//        res.json(result); // msg:"connected"
//    } else {
//        res.json({msg:"not connected"});
//    }
   
//});

router.post('/login', async (req, res, next)=> {
    console.log(req.body);
    let name=req.body.name;
    let pass=req.body.pass;
    let userArr = 
    await pool.query(`SELECT * FROM travel.users WHERE user_name='${name}' AND user_pass='${pass}'`); 
    if(userArr.length > 0){
        req.session.connectedUser = userArr[0];
        res.json({msg:"OK"});
    }else{
        res.json({msg:"NOT CONNECTED"});
    }
}); 

router.get('/logout', function(req,res, next){
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
          if(err) {
            return next(err);
          } else {
            return res.redirect('/');
          }
        });
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


// all DB usernames
router.get('/check', async function (req, res, next) { 
   
        let result = await pool.query('SELECT user_name FROM  travel.users'); 
        res.json(result); 
   
   
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
    res.json({msg:"OK"}); 
}); 



// GET all subs
router.get('/follow/all', async function (req, res, next) { 
    if(req.session.connectedUser){
    let result = await pool.query(`SELECT * FROM travel.subscribers`); 
    res.json(result); } else {
        res.redirect('/login');
    }
}); 

// POST new vacation subscriber
router.post('/subs', async function (req, res, next) { 
    if(req.session.connectedUser.name='ADMIN'){
    let insertQuery= `INSERT INTO  travel.subscribers (uid, vid) 
    VALUES (${req.body.uid},${req.body.vid})`; 
    let result = await pool.query(insertQuery); 
    res.json(result); 
    } else {
        res.redirect('/login');
    }
}); 


// get grouped by vacation count
router.get('/subs/rawcount', async function (req, res, next) { 
    if(req.session.connectedUser.name='ADMIN'){
    let result = await pool.query(`SELECT vid, COUNT(*) as vcount 
    FROM travel.subscribers 
    GROUP BY vid 
    ORDER BY vcount DESC`); 
    res.json(result); 
    } else {
        res.redirect('/login');
    }
}); 

// get names of vactions with 1 value for null
// router.get('/subs/report1', async function (req, res, next) { 
//     let result = await pool.query(`SELECT vacations.vac_destination, vacations.id, 
//     count(*) as number_of_followers 
//     from travel.vacations 
//     left join travel.subscribers on (vacations.id = subscribers.vid) 
//     group by vacations.vac_destination
//     ORDER BY number_of_followers DESC`); 
//     res.json(result); 
// }); 

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
