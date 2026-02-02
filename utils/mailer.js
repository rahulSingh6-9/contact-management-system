import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false, // TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  // 🚑 Railway lifesaver
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
})
