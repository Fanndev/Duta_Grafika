const {
    Barang
} = require('../../../models');
const { ResponseMessage, StatusCode } = require("../../../helpers/httpStatus");

// GET BARANG

exports.GetallBarang = async (req, res) => {
  const {rows :allBarang} = await Barang.findAndCountAll({
    order: [["createdAt", "DESC"]],
  });

    res.render("admin/barang/index", {
      title: "Duta Grafika | admin",
      layout: "layouts/admin/admin_layouts",
      lgnUser: req.user,
      allBarang
    });
};

// CRUD BARANG
exports.add_Barang = async (req, res) => {
  let {
    kode,
    nama_barang,
    stok,
    harga_beli,
    harga_jual,
    keterangan,
  } = req.body;

  try {
    const addBarang = await Barang.create({
      kode,
      nama_barang,
      stok,
      harga_beli,
      harga_jual,
      keterangan
    });
    // if (addBarang) {
    //   return res.redirect("/admin/barang");
    // }
    return res.status(StatusCode.CREATED).json({
      message: ResponseMessage.Added,
      data: addBarang,
    });

  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.FailAdded,
    });
  }
};

exports.update_Barang = async (req, res) => {
  const barang_id = req.params.id;
  const { kode, nama_barang, stok, harga_beli, harga_jual, keterangan } = req.body;

  console.log("Received Data:", {
    barang_id,
    kode,
    nama_barang,
    stok,
    harga_beli,
    harga_jual,
    keterangan,
  }); // log untuk debug

  try {
    const barang = await Barang.findByPk(barang_id);
    if (!barang) {
      return res.status(StatusCode.NOT_FOUND).json({
        message: ResponseMessage.NotFound,
      });
    }

    const updateBarang = await Barang.update(
      {
        kode,
        nama_barang,
        stok,
        harga_beli,
        harga_jual,
        keterangan,
      },
      {
        where: {
          barang_id
        },
      }
    );
    if (updateBarang[0] === 1) {
      return res.status(StatusCode.OK).json({
        message: ResponseMessage.Updated,
        data: await Barang.findByPk(barang_id), // Mengembalikan data terbaru setelah update
      });
    } else {
      return res.status(StatusCode.BAD_REQUEST).json({
        message: ResponseMessage.FailUpdated,
      });
    }
  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.FailUpdated,
    });
  }
};

exports.Delete_Barang = async (req, res) => {
  const barang_id = req.params.id;

  try {
    const deleteBarang = await Barang.destroy({
      where: {
        barang_id,
      },
    });

    return res.status(StatusCode.OK).json({
      message: ResponseMessage.Removed,
      data: deleteBarang,
    });
  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.FailRemoved,
    });
  }
};