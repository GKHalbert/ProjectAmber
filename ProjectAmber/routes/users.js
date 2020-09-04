'use strict';
var express = require('express');
var router = express.Router();
const {database} = require('../config/helpers');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = 'secretKey';

/* GET users listing. */
router.get('/', function (req, res) {
    res.send('respond with a resource');
});

function verifyToken(req,res,next){
    if (!req.headers.authorization){
        return res.status(401).send("Unauthorized request");
    }
    let token = req.headers.authorization.split(' ')[1];

    if (token === 'null'){
        return res.status(401).send('Unauthorized request');
    }

    let payload = jwt.verify(token, secretKey);

    if(!payload){
        return res.status(401).send('Unauthorized request');
    }

    req.username = payload.username;
    next();
}

/* Get user information*/
router.get('/user', verifyToken, function (req, res) {
    let username = req.username;
    database.table('users')
    .leftJoin([
        {
            table:'orders',
            on: 'users.id = orders.user_id'
        }
    ])
    .withFields([
        'users.id as userId',
        'username',
        'fname',
        'lname',
        'email',
        'orders.id as orderId'
    ])
    .filter({username:username})
    .getAll()
    .then(user => {
        
        if(user.length > 0){
            let orders = []
            user.forEach(element => {
                orders.push(element.orderId);
            });
            if (orders === [null]){
                orders = [];
            }
            res.status(200).json({
                                    username: user[0].username,
                                    userId: user[0].userId,
                                    fname: user[0].fname,
                                    lname: user[0].lname,
                                    email: user[0].email,
                                    orders: orders
                                })
        }
        else{
            res.json({message: `NO USER FOUND WITH USERNAME : ${username}`});
        }
    }).catch(err => res.json(err));
});

/* Register a new user. */
router.post('/register', async (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let password = await bcrypt.hash(req.body.password, 10);
    let fname = req.body.fname;
    let lname = req.body.lname;

    console.log(username);

    database.table('users')
    .filter({username:username})
    .get()
    .then(user => {
        if (!user){
            //Save user data
            database.table('users')
            .insert(
                {   username: username,
                    email: email,
                    password: password,
                    role: 555,
                    lname: lname || null,
                    fname: fname || null
                }
            )
            .then(lastId => {
                if (lastId > 0){
                    res.status(201).json({success: true, message: 'Registration successful.'});
                }
                else{
                    res.status(501).json({success: false, message: 'Registration failed'});
                }
            }).catch(err => res.status(433).json({error: err}));
        }
        else{
            res.status(409).json({success: false, message: 'User already exists.'})
        }
    }).catch(err => console.log(err));


});

router.post('/login', async (req, res)=>{
    let username = req.body.username;
    let password = req.body.password;

    const user = await database.table('users')
    .filter({username:username})
    .get();

    if (user){
        let match = await bcrypt.compare(password, user.password);

        if (match){
            let payload = {username: username, state: 'true'};
            let token = jwt.sign(payload,secretKey);
            res.status(200).send({token});
        }
        else{
            res.status(401).send("Username or password incorrect");
        }
    }
    else{
        res.status(401).send("Username or password incorrect");
    }
})

router.patch('/password', verifyToken,async (req, res) => {
    let username = req.username;
    let password = await bcrypt.hash(req.body.password, 10);

    database.table('users')
    .filter({username: username})
    .update({
        password:password
    })
    .then(successNum => {
        res.json("Password updated");
    })
})

module.exports = router;
