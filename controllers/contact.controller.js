import db  from '../config/db.js'
import bcrypt from 'bcrypt'
import { transporter } from '../utils/mailer.js'
import path from 'path'

const contactPage =  path.join(process.cwd(), 'views' ,'contact.html')
const loginPage = path.join(process.cwd(), 'views', 'login.html')
const adminPage = path.join(process.cwd(), 'views', 'admin.html')

//get
export const showLoginPage = (req, res) => {
    res.sendFile(loginPage)
}
export const showAdminPage = (req, res) => {
    if (!req.session.admin) {
        return res.redirect('/login');
    }
    res.sendFile(adminPage)
}
export const showContactForm = (req, res) => {
    res.sendFile(contactPage)
}
export const logout = (req, res) => {
    req.session.admin = false
    res.redirect('/login')
}

//post login
export const loginAdmin = async (req, res) => {
    const { admin_id, password} = req.body

    const [rows] = await db.execute(
        `select * from admin 
        where admin_id = ?`,
        [admin_id]
    )

     if (rows.length === 0) {
    return res.redirect('/login?error=1');
}

    const admin = rows[0]
    const isMatch = await bcrypt.compare(password, admin.password)


if (!isMatch) {
    return res.redirect('/login?error=1');
}

    req.session.admin = true; // simple flag
    res.redirect('/admin');

}

//Contact Save
export const saveContact = async (req, res) => {
  try {
    const { name, email, number, subject, message } = req.body

    const ip_address =
      req.headers['x-forwarded-for'] ||
      req.socket.remoteAddress

    // 1️⃣ DB save (ye already kaam kar raha hai)
    await db.execute(
      `INSERT INTO contact_msg 
      (name, email, phone, subject, message, ip_address)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [name, email, number || null, subject || null, message, ip_address]
    )

    // 2️⃣ EMAIL SEND
    try {
      await transporter.sendMail({
        from: `"Website Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: subject || "New Contact Message",
        html: `
          <h3>New Contact Message</h3>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${number || 'N/A'}</p>
          <p><b>Message:</b><br>${message}</p>
          <p><b>IP:</b> ${ip_address || 'N/A'}</p>
        `
      })
      console.log("Email sent successfully ✅")
    } catch (err) {
      // 👇 YAHI WO CATCH HAI
      console.error("Email error:", err.message)
    }

    // User ko success hi dikhao (email fail ho tab bhi)
    res.send("Message saved successfully ✅")

  } catch (err) {
    console.error("Save contact error:", err)
    res.status(500).send("Something went wrong")
  }
}


/* =====================================================
   🔥 ADMIN API – GET CONTACTS (LATEST 10 + SEARCH)
===================================================== */
export const getContacts = async (req, res) => {
    if (!req.session.admin) {
        return res.status(401).json({ error: "Unauthorized" })
    }

    try {
        const search = req.query.search

        let sql = `
            SELECT 
                id,
                name,
                phone,
                email,
                message AS msg,
                ip_address AS ip,
                DATE(created_at) AS date
               
            FROM contact_msg
            ${search ? "WHERE name LIKE ? OR email LIKE ? OR phone LIKE ?" : ""}
            LIMIT 10
        `//ORDER BY id DESC

        const values = search
            ? [`%${search}%`, `%${search}%`, `%${search}%`]
            : []

        const [rows] = await db.execute(sql, values)
        res.json(rows)

    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Failed to fetch contacts" })
    }
}

/* =====================================================
   🔥 ADMIN API – DELETE SELECTED CONTACTS
===================================================== */
export const deleteContacts = async (req, res) => {
    try {
        const { ids } = req.body

        if (!ids || ids.length === 0) {
            return res.status(400).json({ message: "No IDs provided" })
        }

        const placeholders = ids.map(() => '?').join(',')

        await db.execute(
            `DELETE FROM contact_msg WHERE id IN (${placeholders})`,
            ids
        )

        res.json({ success: true })

    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Delete failed" })
    }
}

// Health check endpoint
export const healtz =  (req, res) => {
  res.status(200).send('OK');
}
