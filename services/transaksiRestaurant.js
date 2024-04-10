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
    const { nomor_meja, nama_menu, harga_menu, kategori_menu, jumlah_pesanan, harga_total, status_pesanan, metode_pembayaran } = transactionData;

    const result = await db.query(
        `INSERT INTO transaksi_restaurant 
        (nomor_meja, nama_menu, harga_menu, kategori_menu, jumlah_pesanan, harga_total, status_pesanan, metode_pembayaran) 
        VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?)`,
        [nomor_meja, nama_menu, harga_menu, kategori_menu, jumlah_pesanan, harga_total, status_pesanan, metode_pembayaran]
    );

    let message = 'Error saat membuat transaksi';

    if (result.affectedRows) {
        message = 'Transaksi berhasil dibuat';
    }

    return { message };
}


//CODE UNTUK PUT
async function updateTransaction(id, transactionData) {
    const { nomor_meja, nama_menu, harga_menu, kategori_menu, jumlah_pesanan, harga_total, status_pesanan, metode_pembayaran } = transactionData;

    const result = await db.query(
        `UPDATE transaksi_restaurant 
        SET nomor_meja=?, nama_menu=?, harga_menu=?, kategori_menu=?, jumlah_pesanan=?, harga_total=?, status_pesanan=?, metode_pembayaran=? 
        WHERE transaksi_id=?`,
        [nomor_meja, nama_menu, harga_menu, kategori_menu, jumlah_pesanan, harga_total, status_pesanan, metode_pembayaran, id]
    );

    let message = 'Error saat memperbarui transaksi';

    if (result.affectedRows) {
        message = 'Transaksi berhasil diperbarui';
    }

    return { message };
}


//CODE UNTUK DELETE
async function removeTransaction(id) {
    const result = await db.query(
        `DELETE FROM transaksi_restaurant WHERE transaksi_id=?`,
        [id]
    );

    let message = 'Error saat menghapus transaksi';

    if (result.affectedRows) {
        message = 'Transaksi berhasil dihapus';
    }

    return { message };
}

module.exports = {
    createTransaction,
    updateTransaction,
    removeTransaction
};
