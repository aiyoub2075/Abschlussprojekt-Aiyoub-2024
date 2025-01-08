import { Pool } from "pg";

export class DbConfig {
  dbPool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT || 5432),
  });

  init() {
    this.dbPool.connect((err, client, done) => {
      if (err) {
        console.error('Error connecting to the database', err)
      } else {
        console.log('Successfully connected to Postgresql');
      }
    })
  }

  pool() {
    return this.dbPool;
  }
}