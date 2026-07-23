const pool = require("./pool");

async function registerUser(firstName, lastName, username, password) {
  await pool.query('Insert INTO users(first_name, last_name, username, password) VALUES ($1, $2, $3, $4)', [firstName, lastName, username, password]);
}

async function getUserByUsername(username) {
  const { rows } = await pool.query('SELECT * FROM users WHERE username = ($1)', [username]);
  return rows[0];
}

async function getUserById(id) {
  const { rows } = await pool.query('SELECT * FROM users WHERE user_id = ($1)', [id]);
  return rows[0];
}

async function getAllMessages() {
  const { rows } = await pool.query('SELECT * FROM messages');
  return rows;
}

async function getMessagesByUserId(id) {
  const { rows } = await pool.query('SELECT * FROM messages WHERE user_id = ($1)', [id]);
  return rows;
}

async function getMessagesWithUser() {
  const { rows } = await pool.query(`SELECT m.message_id, m.title, m.message_text, m.date, u.username 
                  FROM messages m JOIN users u ON m.user_id = u.user_id `);
  return rows;
}

module.exports = {
  registerUser,
  getUserByUsername,
  getUserById,
  getAllMessages,
  getMessagesByUserId,
  getMessagesWithUser
}