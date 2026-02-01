import express from 'express'
import { showContactForm, saveContact, showLoginPage, showAdminPage, loginAdmin, logout, getContacts, deleteContacts } from '../controllers/contact.controller.js'

const router = express.Router()

router.get('/', showContactForm)
router.get('/login', showLoginPage )
router.get('/admin', showAdminPage)
router.get('/logout', logout)
router.get('/api/contacts', getContacts)
router.post('/api/contacts/delete', deleteContacts)


router.post('/', saveContact)
router.post('/login', loginAdmin)

export default router
