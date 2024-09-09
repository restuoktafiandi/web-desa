const { Berita, Gambar } = require("./../models")
const { v4: uuidv4 } = require("uuid")
const fs = require('fs')
const path = require('path')

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

exports.getTambahGambar = (req, res) => {
  res.render("admin/tambahGambar", { activePage: 'gambar' })
}

exports.postTambahGambar = async (req, res) => {

  try {
    if (!req.file) {
      return res.status(400).json({ error: "Gambar tidak terupload" });
    }

    const { judul_gambar } = req.body;
    const { filename } = req.file;

    const fileUrl = `${req.protocol}://${req.get('host')}/img/uploads/${filename}`;
    const id = uuidv4();

    await Gambar.create({
      id,
      judul_gambar,
      url_gambar: fileUrl
    });

    res.redirect("/admin-webpdesa/tambah-gambar");

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

exports.getDaftarGambarAdmin = async (req, res) => {
  try {
    const daftarGambar = await Gambar.findAll();
    res.render('admin/gambar', { activePage: 'gambar', daftarGambar })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

exports.deleteGambar = async (req, res) => {
  const { id } = req.params

  try {
    const gambar = await Gambar.findOne({ where: { id } })

    if (!gambar) {
      return res.status(404).json({ message: "Gambar tidak ditemukan" })
    }

    const filePath = path.join(__dirname, "../public/img/uploads", path.basename(gambar.url_gambar))

    fs.unlink(filePath, async (err) => {
      if (err) {
        console.error("Error menghapus file:", err)
        return res.status(500).send("Terjadi kesalahan saat menghapus file gambar.")
      }

      await Gambar.destroy({ where: { id } })

      res.redirect("/admin-webpdesa/gambar")
    })

  } catch (error) {
    console.error("Error:", error)
    res.status(500).send("Terjadi kesalahan saat menghapus gambar.")
  }
}
