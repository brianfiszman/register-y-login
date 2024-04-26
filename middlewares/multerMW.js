const multer = require('multer');

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
      cb(null, path.join('./public/images/products')); // cb -> callback
    }, 
    filename: function (req, file, cb) {
      console.log(file);
      const newFileName = 'product-' + Date.now() + path.extname(file.originalname);
      cb(null, newFileName);
    }
});
const uploadFile = multer({ storage: storage });

module.exports = storage, uploadFile