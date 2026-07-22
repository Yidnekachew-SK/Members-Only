const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR (50) NOT NULL,
  last_name VARCHAR (50),
  username VARCHAR (50) NOT NULL,
  password VARCHAR (250) NOT NULL,
  membership_status VARCHAR (50) DEFAULT 'new member'
);

CREATE TABLE IF NOT EXISTS messages (
  message_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR (50),
  message_text NUMERIC(3),
  date NUMERIC(3,1),
  user_id INTEGER REFERENCES users(user_id)
);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DB_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();