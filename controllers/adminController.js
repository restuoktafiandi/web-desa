const { Berita } = require("./../models")
const { v4: uuidv4 } = require("uuid")
const fs = require('fs');
const path = require('path');

// Folder tempat gambar disimpan
const IMAGES_DIR = path.join(__dirname, '../public/img');

exports.getIndexAdminPage = (req, res) => {
  res.render('admin/indexAdmin', { activePage: 'home' });
}

exports.getTambahBerita = (req, res) => {
  res.render('admin/tambahBerita', { activePage: 'berita' });
}

exports.postTambahBerita = async (req, res) => {
  try {
    const { judul, penulis, konten, tanggal_posting } = req.body;
    const id = uuidv4()

    console.log(id, judul, penulis, konten, tanggal_posting);
    const addBerita = await Berita.create({
      id,
      judul,
      penulis,
      konten,
      tanggal_posting
    });

    res.redirect("/admin-webpdesa/tambah-berita");

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

exports.getDaftarBerita = async (req, res) => {
  try {
    const daftarBerita = await Berita.findAll({
      order: [['tanggal_posting', 'DESC']]
    }); 
    res.render('web/berita-terbaru', { daftarBerita })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

exports.getDaftarBeritaDiAdmin = async (req, res) => {
  try {
    const daftarBerita = await Berita.findAll({
      order: [['tanggal_posting', 'DESC']]
    }); 
    res.render('admin/berita', { activePage: 'berita', daftarBerita })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

exports.deleteBerita = async (req, res) => {
  const { id } = req.params

  try {
    await Berita.destroy({ where: { id } })
    res.redirect('/admin-webpdesa/berita')
  } catch (error) {
    console.error(error);
    res.status(500).send('Terjadi kesalahan saat menghapus berita.')
  }
};
