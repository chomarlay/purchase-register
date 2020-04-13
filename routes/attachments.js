const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const Attachment = require('../models/Attachment');
const auth = require('../middleware/auth');
// const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs-extra');

const memStorage = multer.memoryStorage();
const upload = multer({ storage: memStorage });

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

module.exports = router;
