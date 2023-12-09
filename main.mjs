import express from 'express';
import { upload } from './multer.mjs';
import { uploadOnCloudinary } from './cloudinary.mjs'

let router = express.Router()

// api to upload image on cloudinary
router.post('/upload', upload.any(), async (req, res, next) => {

    try {

        // get locally saved file path from server
        const localFilePath = req.files[0].path;
        const cloudinaryResponse = await uploadOnCloudinary(localFilePath);

        // response
        if (cloudinaryResponse) {
            res.send({
                message: "uploaded successfully",
                url: cloudinaryResponse.url
            });
        } else {
            res.status(500).send({
                message: "failed to upload"
            });
        }

    } catch (error) {

        console.error(error);
        res.status(500).send({
            message: 'Internal server error'
        });

    }
});

export default router