const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

//@route    GET api/purchases
//@desc     Get all user's products
//@access   Private
router.get('/', auth, async (req, res) => {
  try {
    const products = await Product.find({ user: req.user.id })
      //.select('-createdDate')
      .sort({ createdDate: -1 });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

//@route    POST api/purchases
//@desc     Add new product
//@access   Private
router.post(
  '/',
  [auth, [check('name', 'Please enter name.').not().isEmpty()]],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      name,
      description,
      category,
      brand,
      model,
      serialNo,
      warranty,
      amount,
      purchaseDate,
    } = req.body;
    const newProduct = new Product({
      name,
      description,
      category,
      brand,
      model,
      serialNo,
      warranty,
      amount,
      purchaseDate,
      user: req.user.id,
    });
    try {
      const product = await newProduct.save();
      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

//@route    PUT api/purchases/:id
//@desc     Update product
//@access   Private
router.put(
  '/:id',
  [auth, [check('name', 'Please enter name.').not().isEmpty()]],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('validation error ');
      console.log(errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      name,
      description,
      category,
      brand,
      model,
      serialNo,
      warranty,
      amount,
      purchaseDate,
    } = req.body;
    let productFields = {};
    if (name) productFields.name = name;
    productFields.description = description;
    if (category) productFields.category = category;
    productFields.brand = brand;
    productFields.model = model;
    productFields.serialNo = serialNo;
    productFields.warranty = warranty;
    productFields.amount = amount;
    productFields.purchaseDate = purchaseDate;

    try {
      let product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(401).json({ msg: 'Product not found' });
      }
      // if found ensure it belongs to the requested user
      if (product.user.toString() !== req.user.id) {
        return res
          .status(401)
          .json({ msg: 'Not authorized to update the product details' });
      }
      product = await Product.findByIdAndUpdate(
        req.params.id,
        { $set: productFields },
        { new: true }
      );
      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

//@route    DELETE api/purchases/:id
//@desc     Delete product
//@access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(401).json({ msg: 'Product not found' });
    }
    // if found ensure it belongs to the requested user
    if (product.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: 'Not authorized to delete the product' });
    }
    // ok to delete

    await product.remove(); // note: pre('remove') hook only works with document.remove(), ignore the deprecation warning,  it will be fix in the next release of Mongoose

    res.json({ msg: 'Product has been deleted' });
    console.log('Product has been deleted');
  } catch (err) {
    console.log('Cannot delete product');
  }
});

module.exports = router;
