const express = require("express")
const router = express.Router()
const multer = require("multer")
const path = require("path")
const { getIndexAdminPage, getTambahBerita, postTambahBerita, getDaftarBerita, getDaftarBeritaDiAdmin, deleteBerita } = require("./../controllers/adminController")
const { getRegisterPage, getLoginPage } = require("./../controllers/authController")
const  { authentication } = require("./../middlewares/authMiddleware")

router.get("/admin-webpdesa", authentication, getIndexAdminPage)
router.get("/admin-webpdesa/berita", authentication, getDaftarBeritaDiAdmin)
router.get("/admin-webpdesa/tambah-berita", authentication, getTambahBerita)

router.get("/admin-webpdesa/register", getRegisterPage)
router.get("/admin-webpdesa/login", getLoginPage)

router.post("/simpan-berita", authentication, postTambahBerita)

router.get("/berita-terbaru", getDaftarBerita)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/upload-image', upload.single('image'), (req, res) => {
  res.json({ url: `/img/${req.file.filename}` });
});

router.get('/hapus-berita/:id', authentication, deleteBerita);

module.exports = router
