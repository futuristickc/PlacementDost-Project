const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

//Create new Product
router.post('/products', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
});

//Get all prouducts
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send(error);
    }
});

//Get single product by id
router.get('/products/:id', getProduct, async (req, res) => {
    res.json(res.product);
});

//Update a product by id
router.put('/products/:id', getProduct, async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        Object.assign(res.product, req.body)
        const updatedProduct = await res.product.save();
        res.json(updatedProduct);
        } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Delet a product
router.delete('/products/:id', getProduct, async(req, res) => {
    try {
        console.log('Deleting product:', res.product);
        await Product.deleteOne({ _id: req.params.id });
        res.json({ message: 'Deleted Product' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Middleware function to Get Products by id
async function getProduct(req, res, next) {
    let product;
    try {
        product = await Product.findById(req.params.id);
        if(!product) {
            return res.status(404).json({ message: 'Cannot find product' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.product = product;
    next();
}

module.exports = router;