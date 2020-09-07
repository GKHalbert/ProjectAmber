'use strict';
const express = require('express');
const router = express.Router();
const {database} = require('../config/helpers');

/* GET ALL PRODUCTS*/

router.get('/', function (req, res) {
    let page = (req.query.page != undefined && req.query.page != 0) ? req.query.page : 0; // current page number
    const limit = (req.query.limit != undefined && req.query.limit != 0) ? req.query.limit : Number.MAX_SAFE_INTEGER; //limit of items per page

    let startNum;
    let endNum;

    if (page > 0) {
        startNum = limit * page - limit;
        endNum = startNum + limit;

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

/* GET A SINGLE PRODUCT*/
router.get('/:prodid', function (req, res) {

    database.table('products as p')
    .filter({ 'p.id' : req.params.prodid })
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
        'p.image',
        'p.images',
        'p.description'
    ])
    .get()
    .then(product => {
        if (product) {
            res.status(200).json(product);
        }
        else {
            res.json({ message: `Cannot found product with id ${req.params.prodid}` })
        }
    }
    ).catch(err => console.log(err));

})

/* GET All CATEGORY INFORMATION*/
router.get('/categories/list', function (req, res) {
    database.table('categories')
    .getAll()
    .then(cats => {
        res.status(200).json(cats);
    }).catch(err => console.log(err));
});

/* GET All PRODUCTS FROM ONE SPECIFIC CATEGORY*/
router.get('/category/:catName', function (req, res) {

    const catName = req.params.catName;

    let page = (req.query.page != undefined && req.query.page != 0) ? req.query.page : 0; // current page number
    const limit = (req.query.limit != undefined && req.query.limit != 0) ? req.query.limit : Number.MAX_SAFE_INTEGER; //limit of items per page

    let startNum;
    let endNum;

    if (page > 0) {
        startNum = limit * page - limit;
        endNum = startNum + limit;

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
        .filter({'c.title': catName})
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
                res.json({ message: `Cannot found products in category ${catName}.` })
            }
        }
        ).catch(err => console.log(err));
});

module.exports = router;
