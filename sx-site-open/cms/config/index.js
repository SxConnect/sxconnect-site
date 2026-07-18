const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

module.exports = {
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'sxconnect',
    password: process.env.DB_PASSWORD || 'sxconnect_secret',
    database: process.env.DB_NAME || 'sxconnect_cms',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  },
  session: {
    secret: process.env.SESSION_SECRET || 'change_this_secret_key',
    resave: false,
    saveUninitialized: false
  },
  admin: {
    email: process.env.ADMIN_EMAIL || 'admin@sxconnect.com.br',
    password: process.env.ADMIN_PASSWORD || 'Admin@123'
  },
  port: parseInt(process.env.PORT) || 3000,
  uploadsDir: path.join(__dirname, '..', 'public', 'uploads')
};
