const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

//to connect cloudinary with backend need some config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

//Define storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'nestify_DEV',
    allowerdFormats: ["jpg", "png", "jpeg"]
  },
});

module.exports = {
    cloudinary,
    storage
}