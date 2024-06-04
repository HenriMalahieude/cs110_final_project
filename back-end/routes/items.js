const express = require('express');
const Item = require('../models/item.model');
const multer = require('multer');
const { S3Client } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const s3 = require('../aws-config');

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
});

router.post('/add', upload.single('image'), async (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const image = req.file;

    const uploadParams = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: Date.now().toString() + '-' + image.originalname,
        Body: image.buffer,
        ContentType: image.mimetype,
    };

    try {
        const upload = new Upload({
            client: s3,
            params: uploadParams,
        });
        const data = await upload.done();
        const imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;

        const newItem = new Item({ name, description, imageUrl });

        newItem.save()
            .then(() => res.json('Item added!'))
            .catch(err => res.status(400).json('Error: ' + err));
    } catch (err) {
        console.error(err);
        res.status(500).json('Error uploading image');
    }
});

router.get('/', (req, res) => {
    Item.find()
        .then(items => res.json(items))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
