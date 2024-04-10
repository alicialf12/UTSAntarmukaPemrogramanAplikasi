const db = require('./db');
const helper = require('../helper');
const config = require('../config');

//CODE UNTUK GET
async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM transaksi_restaurant LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

//CODE UNTUK POST
async function createTransaction(transactionData) {
    const {nama_menu, harga_menu, kategori_menu, jumlah_pesanan, harga_total, status_pesanan, metode_pembayaran } = transactionData;

    const result = await db.query(
        `INSERT INTO transaksi_restaurant 
        (nama_menu, harga_menu, kategori_menu, jumlah_pesanan, harga_total, status_pesanan, metode_pembayaran) 
        VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?)`,
        [nama_menu, harga_menu, kategori_menu, jumlah_pesanan, harga_total, status_pesanan, metode_pembayaran]
    );

    let message = 'Error saat membuat transaksi';

    if (result.affectedRows) {
        message = 'Transaksi berhasil dibuat';
    }

    return { message };
}

module.exports = {
  getMultiple, //GET
  createTransaction, //POST
}
