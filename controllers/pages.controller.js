import path from 'path'

// ===== PAGE FILE PATHS =====
const contactPage = path.join(process.cwd(), 'views', 'contact.html')
const loginPage = path.join(process.cwd(), 'views', 'login.html')
const adminPage = path.join(process.cwd(), 'views', 'admin.html')
const updatePasswordPage = path.join(process.cwd(), 'views', 'update-password.html')


export const showLoginPage = (req, res) => {
  res.sendFile(loginPage)
}


export const showAdminPage = (req, res) => {
  // Check if user is authenticated as admin
  if (!req.session.admin) {
    return res.redirect('/login')
  }
  res.sendFile(adminPage)
}


export const showContactForm = (req, res) => {
  res.sendFile(contactPage)
}

export const showUpdatePasswordPage = (req, res) => {
  res.sendFile(updatePasswordPage)
}
