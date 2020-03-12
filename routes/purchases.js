const express = require('express');
const router = express.Router();

//@route    GET api/purchases
//@desc     Get all user's purchases
//@access   Private
router.get('/', (req, res) => {
  res.send('Get all purchases');
});

//@route    POST api/purchases
//@desc     Add new purchase
//@access   Private
router.post('/', (req, res) => {
  res.send('Add purchase');
});

//@route    PUT api/purchases/:id
//@desc     Update purchase
//@access   Private
router.put('/:id', (req, res) => {
  res.send('Update purchase');
});

//@route    DELETE api/purchases/:id
//@desc     Update purchase
//@access   Private
router.delete('/:id', (req, res) => {
  res.send('Delete purchase');
});

module.exports = router;
