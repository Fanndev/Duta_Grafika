const { Customer } = require("../../../models");
const { ResponseMessage, StatusCode } = require("../../../helpers/httpStatus");

// GET PAGE Customer
exports.GetallCustomer = async (req, res) => {
    const { rows: allCustomer } = await Customer.findAndCountAll({
      order: [["createdAt", "DESC"]],
    });
  res.render("admin/customer/index", {
    title: "Duta Grafika | admin",
    layout: "layouts/admin/admin_layouts",
    lgnUser: req.user,
    allCustomer
  });
};

exports.GetpageAdd = async (req, res) => {
  res.render("admin/customer/add", {
    title: "Duta Grafika | admin",
    layout: "layouts/admin/admin_layouts",
    lgnUser: req.user,
  });
};

exports.GetpageEdit = async (req, res) => {
  const customer_id = req.params.id;
  const data = await Customer.findByPk(customer_id);
  res.render("admin/customer/edit", {
    title: "Duta Grafika | admin",
    layout: "layouts/admin/admin_layouts",
    lgnUser: req.user,
    data
  });
};

// CRUD Customer
exports.add_customer = async (req, res) => {
  let { kode, nama_customer, telepon, alamat, is_aktif } = req.body;

  // Konversi is_aktif menjadi boolean jika diperlukan
  is_aktif = is_aktif === "true" || is_aktif === true ? true : false;

  try {
    const add = await Customer.create({
      kode,
      nama_customer,
      telepon,
      alamat,
      is_aktif,
    });

    return res.redirect("/customer")
  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.FailAdded,
      error: error.message, // Tambahkan pesan error untuk debug
    });
  }
};

exports.update_Customer = async (req, res) => {
  const customer_id = req.params.id;
  let { kode, nama_customer, telepon, alamat, is_aktif } = req.body;

  // Konversi is_aktif menjadi boolean jika diperlukan
  is_aktif = is_aktif === "true" || is_aktif === true ? true : false;

  try {
    const update = await Customer.update(
      {
        kode,
        nama_customer,
        telepon,
        alamat,
        is_aktif,
      },
      { where: { customer_id } }
    );

    if (update) {
    return res.redirect('/customer')
    }
  } catch (error) {
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      message: ResponseMessage.Error,
      error: error.message, // Tambahkan pesan error untuk debugging
    });
  }
};

exports.Delete_Customer = async (req, res) => {
  const customer_id = req.params.id;

  try {
    const Delete = await Customer.destroy({
      where: {
        customer_id,
      },
    });

    return res.status(StatusCode.OK).json({
      message: ResponseMessage.Removed,
      data: Delete,
    });
  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.FailRemoved,
    });
  }
};
