import express from 'express'

import { showContactForm, showLoginPage, showAdminPage, showUpdatePasswordPage } from '../controllers/pages.controller.js'
import { loginAdmin, logout, resetPassword, updatePassword } from '../controllers/auth.controller.js'
import { saveContact, getContacts, deleteContacts, healtz } from '../controllers/contact.controller.js'

const router = express.Router()

// ===== PAGE ROUTES =====
router.get('/', showContactForm)
router.get('/login', showLoginPage)
router.get('/admin', showAdminPage)
router.get('/update-password', showUpdatePasswordPage)

// ===== AUTH ROUTES =====
router.post('/login', loginAdmin)
router.get('/logout', logout)
router.post('/api/reset-password', resetPassword)
router.post('/api/update-password', updatePassword)

// ===== CONTACT API ROUTES =====
router.get('/api/contacts', getContacts)
router.post('/', saveContact)
router.post('/api/contacts/delete', deleteContacts)

// ===== HEALTH CHECK =====
router.get('/healthz', healtz)

export default router
