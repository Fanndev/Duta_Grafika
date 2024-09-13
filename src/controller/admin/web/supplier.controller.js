const { Supplier } = require("../../../models");
const { ResponseMessage, StatusCode } = require("../../../helpers/httpStatus");

// GET SUPPLIER
exports.GetallSupplier = async (req, res) => {
  res.render("admin/supplier/index", {
    title: "Duta Grafika | admin",
    layout: "layouts/admin/admin_layouts",
    lgnUser: req.user,
  });
};

exports.GetaddSupplier = async (req, res) => {
  res.render("admin/supplier/add", {
    title: "Duta Grafika | admin",
    layout: "layouts/admin/admin_layouts",
    lgnUser: req.user,
  });
};

exports.GeteditSupplier = async (req, res) => {
  res.render("admin/supplier/edit", {
    title: "Duta Grafika | admin",
    layout: "layouts/admin/admin_layouts",
    lgnUser: req.user,
  });
};

// CRUD SUPPLIER
exports.add_Suplier = async (req, res) => {
  let { kode, nama, telepon, alamat, is_aktif } = req.body;

  // Konversi is_aktif menjadi boolean jika diperlukan
  is_aktif = is_aktif === "true" || is_aktif === true ? true : false;

  try {
    const addSupplier = await Supplier.create({
      kode,
      nama,
      telepon,
      alamat,
      is_aktif,
    });

    return res.status(StatusCode.CREATED).json({
      message: ResponseMessage.Added,
      data: addSupplier,
    });
  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.FailAdded,
      error: error.message, // Tambahkan pesan error untuk debug
    });
  }
};

exports.update_Supplier = async (req, res) => {
  const supplier_id = req.params.id;
  let { kode, nama, telepon, alamat, is_aktif } = req.body;

  // Konversi is_aktif menjadi boolean jika diperlukan
  is_aktif = is_aktif === "true" || is_aktif === true ? true : false;

  try {
    const supplier = await Supplier.findByPk(supplier_id);
    if (!supplier) {
      return res.status(StatusCode.NOT_FOUND).json({
        message: ResponseMessage.NotFound,
      });
    }

    // Update data supplier
    const updateSupplier = await Supplier.update(
      {
        kode,
        nama,
        telepon,
        alamat,
        is_aktif,
      },
      { where: { supplier_id } }
    );

    if (updateSupplier[0] === 1) {
      return res.status(StatusCode.OK).json({
        message: ResponseMessage.Updated,
        data: await Supplier.findByPk(supplier_id), // Mengembalikan data terbaru setelah update
      });
    } else {
      return res.status(StatusCode.BAD_REQUEST).json({
        message: ResponseMessage.FailUpdated,
      });
    }
  } catch (error) {
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      message: ResponseMessage.Error,
      error: error.message, // Tambahkan pesan error untuk debugging
    });
  }
};

exports.Delete_Supplier = async (req, res) => {
  const supplier_id = req.params.id;

  try {
    const Delete_Supplier = await Supplier.destroy({
      where: {
        supplier_id,
      },
    });

    return res.status(StatusCode.OK).json({
      message: ResponseMessage.Removed,
      data: Delete_Supplier,
    });
  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.FailRemoved,
    });
  }
};
