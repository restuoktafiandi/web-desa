const express = require("express")
const router = express.Router()
const multer = require("multer")
const path = require("path")
const { getIndexAdminPage, getTambahBerita, postTambahBerita, getDaftarBerita, getDaftarBeritaDiAdmin, deleteBerita, getDaftarGambarAdmin, postTambahGambar, getTambahGambar, deleteGambar } = require("./../controllers/adminController")
const { getRegisterPage, getLoginPage } = require("./../controllers/authController")
const { authentication } = require("./../middlewares/authMiddleware")
const { uploadGambar } = require( "./../middlewares/uploadMiddleware" )

router.get("/admin-webpdesa", authentication, getIndexAdminPage)
router.get("/admin-webpdesa/berita", authentication, getDaftarBeritaDiAdmin)
router.get("/admin-webpdesa/gambar", authentication, getDaftarGambarAdmin)
router.get("/admin-webpdesa/tambah-berita", authentication, getTambahBerita)
router.get("/admin-webpdesa/tambah-gambar", authentication, getTambahGambar)
router.get("/admin-webpdesa/register", getRegisterPage)
router.get("/admin-webpdesa/login", getLoginPage)

router.post("/simpan-berita", authentication, postTambahBerita)
router.post("/simpan-gambar", authentication, uploadGambar, postTambahGambar)

router.get("/berita-terbaru", getDaftarBerita)

router.get('/hapus-berita/:id', authentication, deleteBerita);
router.get('/hapus-gambar/:id', authentication, deleteGambar);

module.exports = router
