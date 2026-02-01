import express from 'express'
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

export const db = await mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

db.connect(err => {
  if (err) {
    console.error("❌ DB Error:", err.message);
  } else {
    console.log("✅ MySQL Connected");
  }
})

// const [rows] = await db.execute(`DESC contact_msg`)
// console.log(db.host)


