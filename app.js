import express from 'express'
import session from 'express-session'
import path from 'path'
import dotenv from 'dotenv'
import contactRoutes from './routes/contact.routes.js'

dotenv.config()
const app = express()

// ===== MIDDLEWARE =====
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// ===== SESSION CONFIGURATION =====
// Using express-session with default memory store
// For production, integrate with a persistent session store (Redis, MongoDB, etc.)
app.use(session({
  secret: process.env.SESSION_SECRET || 'my_admin_secret_key_change_in_production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}))

// ===== ROUTES =====
app.use('/', contactRoutes)

// ===== ERROR HANDLING =====
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ error: 'Server error' })
})

// ===== START SERVER =====
const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`
╔════════════════════════════════════════╗
║  Contact Page - Supabase Version       ║
║  Server running on port ${port}             ║
╚════════════════════════════════════════╝
  `)
})


