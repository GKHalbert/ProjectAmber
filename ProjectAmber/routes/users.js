'use strict';
var express = require('express');
var router = express.Router();
const {database} = require('../config/helpers');
const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function (req, res) {
    res.send('respond with a resource');
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

module.exports = router;
