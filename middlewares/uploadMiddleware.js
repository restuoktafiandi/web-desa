const multer = require('multer')
const path = require('path')

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/img/uploads"))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
  }
});

exports.uploadGambar = multer({
  storage: diskStorage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Harap upload file gambar"));
    }
    cb(null, true);
  }
}).single("gambar")
