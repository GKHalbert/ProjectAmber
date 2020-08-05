'use strict';
const express = require('express');
const router = express.Router();
const {database} = require('../config/helpers');

/* GET ALL PRODUCTS*/

router.get('/', function (req, res) {
    let page = (req.query.page != undefined && req.query.page != 0) ? req.query.page : 1; // current page number
    const limit = (req.query.limit != undefined && req.query.limit != 0) ? req.query.limit : 10; //limit of items per page

    let startNum;
    let endNum;

    if (page > 0) {
        startNum = page * limit - limit;
        endNum = page * limit;

    }
    else {
        startNum = 0;
        endNum = limit;
    }

    database.table('products as p')
        .join([{
            table: 'categories as c',
            on: 'p.cat_id = c.id'
        }
        ])
        .withFields([
            'p.id',
            'c.title as category',
            'p.title as name',
            'p.price',
            'p.quantity',
            'p.image'
        ])
        .slice(startNum, endNum)
        .sort({ id: 1 })
        .getAll()
        .then(products => {
            if (products.length > 0) {
                res.status(200).json({
                    count: products.length,
                    products: products
                });
            }
            else {
                res.json({ message: 'Cannot found products' })
            }
        }
        ).catch(err => console.log(err));
});

module.exports = router;
