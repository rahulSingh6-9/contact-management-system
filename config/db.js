import express from 'express'
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

export const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
   
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


