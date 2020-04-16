const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const Attachment = require('../models/Attachment');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
// const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs-extra');

const memStorage = multer.memoryStorage();
const upload = multer({ storage: memStorage });

//@route    GET api/attachments/product/:id
//@desc     Get all product's attachments
//@access   Private

router.get('/product/:productId', auth, async (req, res) => {
  try {
    let productId = req.params.productId;
    let prod = await Product.findById(productId);
    if (!prod) {
      return res.status(401).json({ msg: 'Product not found' });
    }
    // if found ensure it belongs to the requested user
    if (prod.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: 'Not authorized to add the attachment.' });
    }
    const attachments = await Attachment.find({ product: productId })
      //.select('-createdDate')
      .sort({ createdDate: -1 });
    res.json(attachments.map((attachment) => attachment.fileName));
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

//@route    POST api/attachments
//@desc     Add new attachment
//@access   Private
router.post(
  '/',
  [
    auth,
    // [check('name', 'Please enter name.').not().isEmpty()],
    upload.single('myAttachment'),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const attachFile = req.file.buffer;
    const encode_attachment = attachFile.toString('base64');
    const productId = req.body.productId;
    // Define an Attachment object for the attachment attributes for saving to database

    var newAttachment = new Attachment({
      product: productId,
      fileName: req.file.originalname,
      contentType: req.file.mimetype,
      attachmentFile: new Buffer(encode_attachment, 'base64'),
    });

    try {
      let prod = await Product.findById(productId);
      if (!prod) {
        return res.status(401).json({ msg: 'Product not found' });
      }
      // if found ensure it belongs to the requested user
      if (prod.user.toString() !== req.user.id) {
        return res
          .status(401)
          .json({ msg: 'Not authorized to add the attachment.' });
      }

      const attachment = await newAttachment.save();
      // res.json(attachment);
      res.status(200).json({
        msg: `Attachment uploaded successfully for ${attachment.product}`,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

//@route    DELETE api/attachments/:id
//@desc     Delete attachment
//@access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let attachment = await Attachment.findById(req.params.id);
    if (!attachment) {
      return res.status(401).json({ msg: 'Attachment not found' });
    }

    // if found ensure it belongs to the requested user
    let prod = await Product.findById(attachment.product);
    if (!prod) {
      return res.status(401).json({ msg: 'Product not found' });
    }

    if (prod.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: 'Not authorized to delete the attachment' });
    }
    // ok to delete

    await attachment.remove();

    res.json({ msg: 'Attachment has been deleted' });
    console.log('Attachment has been deleted');
  } catch (err) {
    console.log('Cannot delete Attachment');
  }
});

//@route    GET api/attachments/:id
//@desc     GET attachment
//@access   Private
router.get('/:id', auth, async (req, res) => {
  try {
    console.log('Get attachment...');
    let attachment = await Attachment.findById(req.params.id);
    if (!attachment) {
      return res.status(401).json({ msg: 'Attachment not found' });
    }
    console.log('Found attachment');
    // if found ensure it belongs to the requested user
    let prod = await Product.findById(attachment.product);
    if (!prod) {
      return res.status(401).json({ msg: 'Product not found' });
    }

    if (prod.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: 'Not authorized to retrieve the attachment' });
    }
    // res.contentType(attachment.contentType);
    // res.send(attachment.attachmentFile);
    res.json({ msg: 'Attachment has been retrieved' });
  } catch (err) {
    console.log('Cannot retrieve the Attachment');
  }
});

module.exports = router;
