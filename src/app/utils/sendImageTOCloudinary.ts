import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

export const sendImageToCloudinary = async () => {
    // Configuration
    cloudinary.config({
        cloud_name: 'dxmikhbl6',
        api_key: '974172734925439',
        api_secret: '<your_api_secret>'
    });

    // Upload an image
    await cloudinary.uploader
        .upload(
            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
            public_id: 'shoes',
        }
        )

}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + '/uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

export const upload = multer({ storage: storage })