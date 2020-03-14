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
    const product = await Product.find({ user: req.user.id })
      //.select('-createdDate')
      .sort({ createdDate: -1 });
    res.json(product);
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
  [
    auth,
    [
      check('name', 'Please enter name.')
        .not()
        .isEmpty()
    ]
  ],

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
      purchaseDate
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
      user: req.user.id
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
  [
    auth,
    [
      check('name', 'Please enter name.')
        .not()
        .isEmpty()
    ]
  ],

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
      purchaseDate
    } = req.body;
    let productFields = {};
    if (name) productFields.name = name;
    if (description) productFields.description = description;
    if (category) productFields.category = category;
    if (model) productFields.model = model;
    if (serialNo) productFields.serialNo = serialNo;
    if (warranty) productFields.warranty = warranty;
    if (amount) productFields.amount = amount;
    if (purchaseDate) productFields.purchaseDate = purchaseDate;

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
//@desc     Update product
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
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Product has been deleted' });
  } catch (err) {}
});

module.exports = router;
