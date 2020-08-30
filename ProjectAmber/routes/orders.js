'use strict';
var express = require('express');
var router = express.Router();
const {database} = require('../config/helpers');
const jwt = require('jsonwebtoken');

const secretKey = 'secretKey';

function verifyOrderToken(req,res,next){
    if (!req.headers.authorization){
        next();
    }

    let token = req.headers.authorization.split(' ')[1];

    if (token === 'null'){
        next();
    }

    let payload = jwt.verify(token, secretKey);

    if(!payload){
        next();
    }

    database.table('users')
    .filter({username: payload.username})
    .get()
    .then(user => {
        if (!user){
            next();
        }
        else{
            req.userId = user.id;
            next();
        }
    }).catch(err => console.log(err));



    

}
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
        'p.title',
        'p.description as description',
        'p.price',
        'od.quantity',
        'p.image'
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
router.post('/new', verifyOrderToken, function (req, res) {
    let userId = req.userId;
    console.log(userId)
    console.log(req.body);
    let products = req.body.products;

    if (userId === null || userId < 0){
        res.json({message: 'Cannot place order', success: false});
    }
    else{

        database.table('orders')
            .insert({user_id: userId})
            .then(newOrderId =>{
                let productIndex = 0;
                let lastIndex = products.length - 1;
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
                            update `products` set quantity = quantity - ' + inCart + ' where id = ' + p.id + ';commit;')
                                .then(result=> {
                                    if(productIndex == lastIndex){
                                        res.json({
                                            message: `Order successfully placed with order id ${newOrderId}`,
                                            success: true,
                                            order_id: newOrderId,
                                            products: products
                                        });                       

                                    }
                                    else{
                                        productIndex++; 
                                    }
                                }).catch(err => console.log(err));
                        }).catch(err => console.log(err));
                    
                }
                
               
                );

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
