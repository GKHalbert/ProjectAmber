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

/*PLACE A NEW ORDER*/
router.post('/new', function (req, res) {
    let userId = req.body.userId;
    console.log(req.body);
    let products = req.body.products;

    if (userId === null || userId < 0){
        res.json({message: 'Cannot place order', success: false});
    }
    else{

        database.table('orders')
            .insert({user_id: userId})
            .then(newOrderId =>{
                products.forEach(async p => {
                    let productStock = await database.table('products').filter({id: p.id}).withFields(['quantity']).get();
                    let inCart = parseInt(p.incart);

                    productStock = productStock.quantity - inCart

                    if(productStock < 0){
                        productStock = 0;
                    }
                    database.table('order_details')
                        .insert(
                            {order_id: newOrderId,
                            product_id: p.id,
                            quantity: inCart}
                            )
                        .then(newDetailId => {
                            database.query('start transaction; select * from `products` where id = ' + p.id  + ' for update; \
                            update `products` set quantity = quantity - ' + inCart + ' where id = ' + p.id + ';')
                                .then(result=> {}).catch(err => console.log(err));
                        }).catch(err => console.log(err));
                    
                }                          
                );

                res.json({
                    message: `Order successfully placed with order id ${newOrderId}`,
                    success: true,
                    order_id: newOrderId,
                    products: products
                })
            }).catch(err => res.json(err));
    }

    
});

// Fake Payment 
router.post('/payment', (req, res) => {
    setTimeout(() => {
        res.status(200).json({success: true});
    }, 3000)
});

module.exports = router;
