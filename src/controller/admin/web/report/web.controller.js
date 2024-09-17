require("dotenv").config();
const {
    Barang,
    Customer,
    Orderan,
    Pegawai,
    Supplier,
    transaksi,
    Operasional,
    Jurnal
} = require("../../../../models")
const path = require("path");

const downloadBarangReport = async (req, res) => {
  const workBook = new excelJS.Workbook(); // Create a new workbook
  const workSheet = workBook.addWorksheet("Barang-Report"); // New worksheet
  const path = "./report"; // Path to download excel

  // Column for data in excel. key must match data key
  workSheet.columns = [
    { header: "No.", key: "s_no", width: 5 },
    { header: "Kode Barang", key: "kode", width: 15 },
    { header: "Nama Barang", key: "nama_barang", width: 25 },
    { header: "Stok", key: "stok", width: 10 },
    { header: "Harga Beli", key: "harga_beli", width: 15 },
    { header: "Harga Jual", key: "harga_jual", width: 15 },
    { header: "Keterangan", key: "keterangan", width: 30 },
  ];

  // Filter berdasarkan tanggal
  let { date } = req.body;
  const dateParts = date.split(" - ");
  const startDateString = dateParts[0];
  const endDateString = dateParts[1];
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  // Mengambil data barang berdasarkan rentang tanggal
  let counter = 1;
  const BarangData = await Barang.findAll({
    where: {
      createdAt: {
        [Op.between]: [startDate, endDate],
      },
    },
  });

  // Menambahkan data barang ke worksheet
  BarangData.forEach((barang) => {
    workSheet.addRow({
      s_no: counter,
      kode: barang.kode,
      nama_barang: barang.nama_barang,
      stok: barang.stok,
      harga_beli: barang.harga_beli.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      }),
      harga_jual: barang.harga_jual.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      }),
      keterangan: barang.keterangan,
    });
    counter++;
  });

  // Membuat baris pertama menjadi tebal (bold)
  workSheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });

  try {
    await workBook.xlsx.writeFile(`${path}/barang-report.xlsx`).then(() => {
      res.download(
        `${path}/barang-report.xlsx`,
        "barang-report.xlsx",
        (err) => {
          if (err) {
            console.log(err);
          } else {
            fs.unlinkSync(`${path}/barang-report.xlsx`);
          }
        }
      );
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "error",
      message: "Something went wrong",
    });
  }
};


 module.exports = {
   downloadBarangReport,
 };