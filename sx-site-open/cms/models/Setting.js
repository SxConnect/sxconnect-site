const db = require('../config/database');

const Setting = {
  async get(key) {
    const [rows] = await db.query('SELECT setting_value FROM settings WHERE setting_key = ?', [key]);
    return rows[0] ? rows[0].setting_value : null;
  },

  async getAll() {
    const [rows] = await db.query('SELECT * FROM settings');
    const result = {};
    rows.forEach(r => { result[r.setting_key] = r.setting_value; });
    return result;
  },

  async set(key, value) {
    await db.query(
      'INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?',
      [key, value, value]
    );
  },

  async delete(key) {
    await db.query('DELETE FROM settings WHERE setting_key = ?', [key]);
  }
};

module.exports = Setting;
