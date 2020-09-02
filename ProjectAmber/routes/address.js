'use strict';
var express = require('express');
var router = express.Router();
const {database} = require('../config/helpers');
const { tokenVerifier } = require("../config/helpers")



/* GET address by user Id */
router.get('/userAddr',tokenVerifier, function (req, res) {
    let userId = req.userId;

    database.table('addresses')
    .filter({ user_id: userId })
    .getAll()
    .then(addresses => {
        res.status(200).json(addresses)
    }).catch(err => console.log(err));
});

router.post('/new',tokenVerifier, function (req, res) {
    
    let addr = req.body;

    if(!addr.user_id){
        addr.user_id  = req.userId;
    }    

    console.log(addr)

    database.table('addresses')
    .insert(addr)
    .then(newDetailId => {
        database.table('addresses')
        .filter({user_id: req.body.user_id})
        .getAll()
        .then(newAddresses => {
            res.status(200).json(newAddresses);
        }).catch(err => console.log(err))

    }).catch(err => console.log(err));
});

/* Delete a address by id */
router.delete('/:id', tokenVerifier, function (req, res) {
    let addrId = req.params.id;
    let userId = req.userId;

    

    database.table('addresses')
    .filter({ id:addrId })
    .remove()
    .then(successNum  => {
        database.table('addresses')
        .filter({user_id: userId})
        .getAll()
        .then(newAddresses => {
            res.status(200).json(newAddresses)
        }).catch(err => console.log(err));
       
    }).catch(err => console.log(err));
});


module.exports = router;