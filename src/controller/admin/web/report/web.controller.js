require("dotenv").config();
const {
    Barang,
    Customer,
    Orderan,
    Pegawai,
    Supplier,
    Transaksi,
    Operasional,
    Jurnal
} = require("../../../../models")
const excelJS = require("exceljs");
const path = require("path");

const downloadBarangReport = async (req, res) => {
  const workBook = new excelJS.Workbook();
  const workSheet = workBook.addWorksheet("Barang-Report");
  const path = "./report";
  const fs = require("fs");

  // Ensure report directory exists
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }

  // Column for data in excel
  workSheet.columns = [
    { header: "No.", key: "s_no", width: 5 },
    { header: "Kode Barang", key: "kode", width: 15 },
    { header: "Nama Barang", key: "nama_barang", width: 25 },
    { header: "Stok", key: "stok", width: 10 },
    { header: "Harga Beli", key: "harga_beli", width: 15 },
    { header: "Harga Jual", key: "harga_jual", width: 15 },
    { header: "Keterangan", key: "keterangan", width: 30 },
  ];

  // Mengambil semua data barang tanpa filter tanggal
  let counter = 1;
  const BarangData = await Barang.findAll();

  if (!BarangData || BarangData.length === 0) {
    return res.status(404).send({ message: "No data found" });
  }

  // Menambahkan data barang ke worksheet
  BarangData.forEach((barang) => {
    workSheet.addRow({
      s_no: counter,
      kode: barang.kode,
      nama_barang: barang.nama_barang,
      stok: barang.stok,
      harga_beli: (barang.harga_beli || 0).toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      }),
      harga_jual: (barang.harga_jual || 0).toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      }),
      keterangan: barang.keterangan,
    });
    counter++;
  });

  // Membuat baris pertama menjadi tebal
  workSheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });

  try {
    await workBook.xlsx.writeFile(`${path}/barang-report.xlsx`);
    res.download(`${path}/barang-report.xlsx`, "barang-report.xlsx", (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ message: "File download failed" });
      }
      fs.unlinkSync(`${path}/barang-report.xlsx`);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "error",
      message: "Failed to generate or download the report",
    });
  }
};

const downloadCustomerReport = async (req, res) => {
  const workBook = new excelJS.Workbook();
  const workSheet = workBook.addWorksheet("Customer-Report");
  const path = "./report";
  const fs = require("fs");

  // Ensure report directory exists
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }

  // Column for data in excel
  workSheet.columns = [
    { header: "No.", key: "s_no", width: 5 },
    { header: "Kode Customer", key: "kode", width: 15 },
    { header: "Nama Customer", key: "nama_customer", width: 25 },
    { header: "Telepon", key: "telepon", width: 15 },
    { header: "Alamat", key: "alamat", width: 30 },
    { header: "Status Aktif", key: "is_aktif", width: 10 },
  ];

  // Mengambil semua data customer tanpa filter
  let counter = 1;
  const CustomerData = await Customer.findAll();

  if (!CustomerData || CustomerData.length === 0) {
    return res.status(404).send({ message: "No data found" });
  }

  // Menambahkan data customer ke worksheet
  CustomerData.forEach((customer) => {
    workSheet.addRow({
      s_no: counter,
      kode: customer.kode,
      nama_customer: customer.nama_customer,
      telepon: customer.telepon,
      alamat: customer.alamat,
      is_aktif: customer.is_aktif ? "Aktif" : "Tidak Aktif",
    });
    counter++;
  });

  // Membuat baris pertama menjadi tebal
  workSheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });

  try {
    await workBook.xlsx.writeFile(`${path}/customer-report.xlsx`);
    res.download(
      `${path}/customer-report.xlsx`,
      "customer-report.xlsx",
      (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ message: "File download failed" });
        }
        fs.unlinkSync(`${path}/customer-report.xlsx`);
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "error",
      message: "Failed to generate or download the report",
    });
  }
};

const downloadOperasionalReport = async (req, res) => {
  const workBook = new excelJS.Workbook();
  const workSheet = workBook.addWorksheet("Operasional-Report");
  const path = "./report";
  const fs = require("fs");

  // Ensure report directory exists
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }

  // Column for data in excel
  workSheet.columns = [
    { header: "No.", key: "s_no", width: 5 },
    { header: "Kode Operasional", key: "kode", width: 15 },
    { header: "Nama Operasional", key: "nama_oper", width: 25 },
    { header: "Tanggal Transaksi", key: "tgl_transaksi", width: 20 },
    { header: "Debet", key: "debet", width: 15 },
    { header: "Kredit", key: "kredit", width: 15 },
    { header: "Nama Pegawai", key: "nama_pegawai", width: 25 },
  ];

  // Mengambil semua data operasional tanpa filter
  let counter = 1;
  const OperasionalData = await Operasional.findAll();

  if (!OperasionalData || OperasionalData.length === 0) {
    return res.status(404).send({ message: "No data found" });
  }

  // Menambahkan data operasional ke worksheet
  OperasionalData.forEach((operasional) => {
    workSheet.addRow({
      s_no: counter,
      kode: operasional.kode,
      nama_oper: operasional.nama_oper,
      tgl_transaksi: operasional.tgl_transaksi,
      debet: (operasional.debet || 0).toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      }),
      kredit: (operasional.kredit || 0).toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      }),
      nama_pegawai: operasional.nama_pegawai,
    });
    counter++;
  });

  // Membuat baris pertama menjadi tebal
  workSheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });

  try {
    await workBook.xlsx.writeFile(`${path}/operasional-report.xlsx`);
    res.download(
      `${path}/operasional-report.xlsx`,
      "operasional-report.xlsx",
      (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ message: "File download failed" });
        }
        fs.unlinkSync(`${path}/operasional-report.xlsx`);
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "error",
      message: "Failed to generate or download the report",
    });
  }
};

const downloadOrderanReport = async (req, res) => {
  const workBook = new excelJS.Workbook();
  const workSheet = workBook.addWorksheet("Orderan-Report");
  const path = "./report";
  const fs = require("fs");

  // Ensure report directory exists
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }

  // Column for data in excel
  workSheet.columns = [
    { header: "No.", key: "s_no", width: 5 },
    { header: "Kode Orderan", key: "kode", width: 15 },
    { header: "Tanggal Terima", key: "tgl_terima", width: 20 },
    { header: "Tanggal Ambil", key: "tgl_ambil", width: 20 },
    { header: "Nama Pesanan", key: "nama_pesanan", width: 25 },
    { header: "Jenis Pesanan", key: "jenis_pesanan", width: 20 },
    { header: "Quantity", key: "qty", width: 10 },
    { header: "Keterangan", key: "keterangan", width: 30 },
  ];

  // Mengambil semua data orderan tanpa filter
  let counter = 1;
  const OrderanData = await Orderan.findAll();

  if (!OrderanData || OrderanData.length === 0) {
    return res.status(404).send({ message: "No data found" });
  }

  // Menambahkan data orderan ke worksheet
  OrderanData.forEach((orderan) => {
    workSheet.addRow({
      s_no: counter,
      kode: orderan.kode,
      tgl_terima: orderan.tgl_terima,
      tgl_ambil: orderan.tgl_ambil,
      nama_pesanan: orderan.nama_pesanan,
      jenis_pesanan: orderan.jenis_pesanan,
      qty: orderan.qty,
      keterangan: orderan.keterangan,
    });
    counter++;
  });

  // Membuat baris pertama menjadi tebal
  workSheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });

  try {
    await workBook.xlsx.writeFile(`${path}/orderan-report.xlsx`);
    res.download(
      `${path}/orderan-report.xlsx`,
      "orderan-report.xlsx",
      (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ message: "File download failed" });
        }
        fs.unlinkSync(`${path}/orderan-report.xlsx`);
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "error",
      message: "Failed to generate or download the report",
    });
  }
};

const downloadPegawaiReport = async (req, res) => {
  const workBook = new excelJS.Workbook();
  const workSheet = workBook.addWorksheet("Pegawai-Report");
  const path = "./report";
  const fs = require("fs");

  // Ensure report directory exists
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }

  // Column for data in excel
  workSheet.columns = [
    { header: "No.", key: "s_no", width: 5 },
    { header: "Kode Pegawai", key: "kode", width: 15 },
    { header: "Nama Pegawai", key: "nama_pegawai", width: 25 },
    { header: "Telepon", key: "telepon", width: 20 },
    { header: "Alamat", key: "alamat", width: 30 },
    { header: "Status Aktif", key: "is_aktif", width: 10 },
  ];

  // Mengambil semua data pegawai tanpa filter
  let counter = 1;
  const PegawaiData = await Pegawai.findAll();

  if (!PegawaiData || PegawaiData.length === 0) {
    return res.status(404).send({ message: "No data found" });
  }

  // Menambahkan data pegawai ke worksheet
  PegawaiData.forEach((pegawai) => {
    workSheet.addRow({
      s_no: counter,
      kode: pegawai.kode,
      nama_pegawai: pegawai.nama_pegawai,
      telepon: pegawai.telepon,
      alamat: pegawai.alamat,
      is_aktif: pegawai.is_aktif ? "Aktif" : "Tidak Aktif",
    });
    counter++;
  });

  // Membuat baris pertama menjadi tebal
  workSheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });

  try {
    await workBook.xlsx.writeFile(`${path}/pegawai-report.xlsx`);
    res.download(
      `${path}/pegawai-report.xlsx`,
      "pegawai-report.xlsx",
      (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ message: "File download failed" });
        }
        fs.unlinkSync(`${path}/pegawai-report.xlsx`);
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "error",
      message: "Failed to generate or download the report",
    });
  }
};

const downloadSupplierReport = async (req, res) => {
  const workBook = new excelJS.Workbook();
  const workSheet = workBook.addWorksheet("Supplier-Report");
  const path = "./report";
  const fs = require("fs");

  // Ensure report directory exists
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }

  // Column for data in excel
  workSheet.columns = [
    { header: "No.", key: "s_no", width: 5 },
    { header: "Kode Supplier", key: "kode", width: 15 },
    { header: "Nama Supplier", key: "nama", width: 25 },
    { header: "Telepon", key: "telepon", width: 20 },
    { header: "Alamat", key: "alamat", width: 30 },
    { header: "Status Aktif", key: "is_aktif", width: 10 },
  ];

  // Mengambil semua data supplier tanpa filter
  let counter = 1;
  const SupplierData = await Supplier.findAll();

  if (!SupplierData || SupplierData.length === 0) {
    return res.status(404).send({ message: "No data found" });
  }

  // Menambahkan data supplier ke worksheet
  SupplierData.forEach((supplier) => {
    workSheet.addRow({
      s_no: counter,
      kode: supplier.kode,
      nama: supplier.nama,
      telepon: supplier.telepon,
      alamat: supplier.alamat,
      is_aktif: supplier.is_aktif ? "Aktif" : "Tidak Aktif",
    });
    counter++;
  });

  // Membuat baris pertama menjadi tebal
  workSheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });

  try {
    await workBook.xlsx.writeFile(`${path}/supplier-report.xlsx`);
    res.download(
      `${path}/supplier-report.xlsx`,
      "supplier-report.xlsx",
      (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ message: "File download failed" });
        }
        fs.unlinkSync(`${path}/supplier-report.xlsx`);
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "error",
      message: "Failed to generate or download the report",
    });
  }
};

const downloadTransaksiReport = async (req, res) => {
  const workBook = new excelJS.Workbook();
  const workSheet = workBook.addWorksheet("Transaksi-Report");
  const path = "./report";
  const fs = require("fs");

  // Ensure report directory exists
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }

  // Column for data in excel
  workSheet.columns = [
    { header: "No.", key: "s_no", width: 5 },
    { header: "Kode Transaksi", key: "kode", width: 15 },
    { header: "Nama Barang", key: "nama_barang", width: 25 },
    { header: "Tanggal Pembelian", key: "tgl_pembelian", width: 20 },
    { header: "Total Order", key: "total_order", width: 15 },
    { header: "Harga Barang", key: "harga_barang", width: 15 },
    { header: "Status Aktif", key: "is_aktif", width: 10 },
  ];

  // Mengambil semua data transaksi tanpa filter
  let counter = 1;
  const TransaksiData = await Transaksi.findAll();

  if (!TransaksiData || TransaksiData.length === 0) {
    return res.status(404).send({ message: "No data found" });
  }

  // Menambahkan data transaksi ke worksheet
  TransaksiData.forEach((transaksi) => {
    workSheet.addRow({
      s_no: counter,
      kode: transaksi.kode,
      nama_barang: transaksi.nama_barang,
      tgl_pembelian: transaksi.tgl_pembelian,
      total_order: transaksi.total_order,
      harga_barang: transaksi.harga_barang.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      }),
      is_aktif: transaksi.is_aktif ? "Aktif" : "Tidak Aktif",
    });
    counter++;
  });

  // Membuat baris pertama menjadi tebal
  workSheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });

  try {
    await workBook.xlsx.writeFile(`${path}/transaksi-report.xlsx`);
    res.download(
      `${path}/transaksi-report.xlsx`,
      "transaksi-report.xlsx",
      (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ message: "File download failed" });
        }
        fs.unlinkSync(`${path}/transaksi-report.xlsx`);
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "error",
      message: "Failed to generate or download the report",
    });
  }
};

const downloadJurnalReport = async (req, res) => {
  const workBook = new excelJS.Workbook();
  const workSheet = workBook.addWorksheet("Jurnal-Report");
  const path = "./report";
  const fs = require("fs");

  // Ensure report directory exists
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }

  // Column for data in excel
  workSheet.columns = [
    { header: "No.", key: "s_no", width: 5 },
    { header: "Tanggal", key: "tanggal", width: 15 },
    { header: "Nomor Jurnal", key: "nomor_jurnal", width: 20 },
    { header: "Akun", key: "akun", width: 25 },
    { header: "Debet", key: "debet", width: 15 },
    { header: "Kredit", key: "kredit", width: 15 },
  ];

  // Mengambil semua data jurnal tanpa filter
  let counter = 1;
  const JurnalData = await Jurnal.findAll();

  if (!JurnalData || JurnalData.length === 0) {
    return res.status(404).send({ message: "No data found" });
  }

  // Menambahkan data jurnal ke worksheet
  JurnalData.forEach((jurnal) => {
    workSheet.addRow({
      s_no: counter,
      tanggal: jurnal.tanggal,
      nomor_jurnal: jurnal.nomor_jurnal,
      akun: jurnal.akun,
      debet: jurnal.debet.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      }),
      kredit: jurnal.kredit.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      }),
    });
    counter++;
  });

  // Membuat baris pertama menjadi tebal
  workSheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });

  try {
    await workBook.xlsx.writeFile(`${path}/jurnal-report.xlsx`);
    res.download(`${path}/jurnal-report.xlsx`, "jurnal-report.xlsx", (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ message: "File download failed" });
      }
      fs.unlinkSync(`${path}/jurnal-report.xlsx`);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "error",
      message: "Failed to generate or download the report",
    });
  }
};


 module.exports = {
   downloadBarangReport,
   downloadCustomerReport,
   downloadOperasionalReport,
   downloadOrderanReport,
   downloadPegawaiReport,
   downloadSupplierReport,
   downloadTransaksiReport,
   downloadJurnalReport
 };