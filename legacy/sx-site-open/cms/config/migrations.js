const config = require('./index');
const path = require('path');
const fs = require('fs');

const schema = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  image VARCHAR(255),
  category_id INT,
  tags VARCHAR(500),
  featured TINYINT(1) DEFAULT 0,
  published TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS pages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content TEXT NOT NULL,
  show_in_menu TINYINT(1) DEFAULT 0,
  menu_order INT DEFAULT 0,
  published TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS sections (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255),
  subtitle VARCHAR(500),
  content TEXT,
  image VARCHAR(255),
  extra JSON,
  visible TINYINT(1) DEFAULT 1,
  section_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS solutions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  subtitle VARCHAR(500),
  description TEXT,
  icon VARCHAR(50),
  features JSON,
  cta_text VARCHAR(100),
  cta_link VARCHAR(255),
  display_order INT DEFAULT 0,
  published TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS menu_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(100) NOT NULL,
  url VARCHAR(255),
  page_id INT,
  parent_id INT DEFAULT NULL,
  menu_order INT DEFAULT 0,
  target VARCHAR(20) DEFAULT '_self',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (page_id) REFERENCES pages(id) ON DELETE SET NULL,
  FOREIGN KEY (parent_id) REFERENCES menu_items(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(100) NOT NULL UNIQUE,
  setting_value TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;

async function runMigrations() {
  const pool = require('./database');
  const queries = schema.split(';').filter(q => q.trim());

  for (const query of queries) {
    try {
      await pool.query(query);
    } catch (err) {
      console.error('Migration error:', err.message);
    }
  }
  console.log('Migrações executadas com sucesso.');
}

module.exports = { runMigrations, schema };
