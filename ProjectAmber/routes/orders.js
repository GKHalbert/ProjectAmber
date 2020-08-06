'use strict';
var express = require('express');
var router = express.Router();
const {database} = require('../config/helpers');

/* GET ALL orders */
router.get('/', function (req, res) {
    database.table('order_details as od')
    .join([{
        table: 'orders as o',
        on: 'od.order_id = o.id'
    },
    {
        table: 'products as p',
        on: 'od.product_id = p.id'
    },
    {
        table: 'users as u',
        on: 'o.user_id = u.id'
    },

    ])
    .withFields([
        'o.id',
        'p.title as product',
        'p.description as description',
        'p.price',
        'od.quantity',
        'u.username'
    ])
    .sort({ id: 1 })
    .getAll()
    .then(orders => {
        if (orders.length > 0) {
            res.status(200).json(orders);
        }
        else {
            res.json({ message: 'Cannot found orders' })
        }
    }
    ).catch(err => console.log(err));
});

/* GET AN ORDER WITH ID */
router.get('/:orderid', function (req, res) {

    const orderid = req.params.orderid;

    database.table('order_details as od')
    .join([{
        table: 'orders as o',
        on: 'od.order_id = o.id'
    },
    {
        table: 'products as p',
        on: 'od.product_id = p.id'
    },
    {
        table: 'users as u',
        on: 'o.user_id = u.id'
    },

    ])
    .withFields([
        'o.id',
        'p.title as product',
        'p.description as description',
        'p.price',
        'od.quantity',
        'u.username'
    ])
    .filter({ 'o.id': orderid })
    .getAll()
    .then(orders => {
        if (orders.length > 0) {
            res.status(200).json(orders);
        }
        else {
            res.json({ message: `Cannot found orders with id ${orderid}` });
        }
    }
    ).catch(err => console.log(err));
});
module.exports = router;
