const mysql = require('mysql2/promise');

let pool = null;
let isConnected = false;

// In-memory fallback if MySQL server is not configured or reachable
const fallbackContactsStore = [];

async function initializeMySQL() {
  const host = process.env.MYSQL_HOST;
  const user = process.env.MYSQL_USER;
  const password = process.env.MYSQL_PASSWORD;
  const database = process.env.MYSQL_DATABASE;
  const port = process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306;

  if (!host || !user) {
    console.log('[MySQL] No MySQL credentials configured in environment. Operating in safe fallback mode.');
    return;
  }

  try {
    pool = mysql.createPool({
      host,
      user,
      password,
      database,
      port,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    const connection = await pool.getConnection();
    console.log('[MySQL] Successfully connected to MySQL database:', database || 'default');

    // Create portfolio_contacts table if not exists
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS portfolio_contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        submitted_date VARCHAR(50) NOT NULL,
        submitted_time VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `;
    await connection.query(createTableQuery);
    console.log('[MySQL] Verified table: portfolio_contacts');
    connection.release();
    isConnected = true;
  } catch (err) {
    console.warn('[MySQL] Could not connect to MySQL server:', err.message);
    console.log('[MySQL] Running with persistent in-memory/excel fallback.');
    isConnected = false;
  }
}

async function saveContactToMySQL({ name, email, message, submitted_date, submitted_time }) {
  if (isConnected && pool) {
    try {
      const sql = `
        INSERT INTO portfolio_contacts (name, email, message, submitted_date, submitted_time)
        VALUES (?, ?, ?, ?, ?)
      `;
      const [result] = await pool.execute(sql, [name, email, message, submitted_date, submitted_time]);
      return { success: true, insertId: result.insertId };
    } catch (dbErr) {
      console.error('[MySQL] Insert error:', dbErr.message);
    }
  }

  // Safe fallback store
  const fallbackRecord = {
    id: fallbackContactsStore.length + 1,
    name,
    email,
    message,
    submitted_date,
    submitted_time,
    created_at: new Date().toISOString(),
  };
  fallbackContactsStore.push(fallbackRecord);
  return { success: true, insertId: fallbackRecord.id, fallback: true };
}

async function getContactsFromMySQL() {
  if (isConnected && pool) {
    try {
      const [rows] = await pool.query('SELECT * FROM portfolio_contacts ORDER BY id DESC');
      return rows;
    } catch (err) {
      console.error('[MySQL] Query error:', err.message);
    }
  }
  return [...fallbackContactsStore].reverse();
}

module.exports = {
  initializeMySQL,
  saveContactToMySQL,
  getContactsFromMySQL,
};
