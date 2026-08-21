import { supabase } from '../config/supabase.js'
import { createClient } from '@supabase/supabase-js'
import { transporter } from '../utils/mailer.js'


export const saveContact = async (req, res) => {
  try {
    const { name, email, number, subject, message } = req.body

    const ip_address =
      req.headers['x-forwarded-for'] ||
      req.socket.remoteAddress

    // Insert into Supabase contact_messages table
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name,
          email,
          phone: number || null,
          subject: subject || null,
          message,
          ip_address,
          created_at: new Date().toISOString()
        }
      ])

    if (error) {
      console.error('Database error:', error.message)
      return res.status(500).send('Failed to save message')
    }

    // Send email notification (non-blocking)
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
      console.log("✅ Email sent successfully")
    } catch (err) {
      // Log error but don't fail the request
      console.error("⚠️ Email error:", err.message)
    }

    // Return success to user even if email fails
    res.send("Message saved successfully ✅")

  } catch (err) {
    console.error("Save contact error:", err)
    res.status(500).send("Something went wrong")
  }
}

/**
 * Get All Contacts (Admin Only)
 * Retrieves contacts with optional search filtering
 * Requires admin session
 */
export const getContacts = async (req, res) => {
  // Check if user is authenticated as admin
  if (!req.session.admin) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  try {
    const search = req.query.search

    // Create a scoped client for the authenticated admin
    const scopedSupabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
      global: {
        headers: {
          Authorization: `Bearer ${req.session.admin.token}`
        }
      }
    })

    // Build query using correct PostgREST alias syntax: alias:column
    let query = scopedSupabase
      .from('contact_messages')
      .select('id, name, phone, email, msg:message, ip:ip_address, created_at')
      .order('created_at', { ascending: false })
      .limit(50) // Get more results for pagination

    // Apply search filter if provided
    if (search) {
      query = query.or(
        `name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`
      )
    }

    const { data, error } = await query

    if (error) {
      console.error('Query error:', error.message)
      return res.status(500).json({ error: "Failed to fetch contacts" })
    }

    // Format dates for display
    const formattedData = data.map(contact => ({
      ...contact,
      date: new Date(contact.created_at).toISOString().split('T')[0]
    }))

    res.json(formattedData)

  } catch (err) {
    console.error('Error fetching contacts:', err)
    res.status(500).json({ error: "Failed to fetch contacts" })
  }
}

/**
 * Delete Selected Contacts (Admin Only)
 * Deletes multiple contacts by ID
 */
export const deleteContacts = async (req, res) => {
  try {
    // Check authentication
    if (!req.session.admin) {
      return res.status(401).json({ error: "Unauthorized" })
    }

    const { ids } = req.body

    if (!ids || ids.length === 0) {
      return res.status(400).json({ message: "No IDs provided" })
    }

    // Create a scoped client for the authenticated admin
    const scopedSupabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
      global: {
        headers: {
          Authorization: `Bearer ${req.session.admin.token}`
        }
      }
    })

    // Delete from Supabase
    const { error } = await scopedSupabase
      .from('contact_messages')
      .delete()
      .in('id', ids)

    if (error) {
      console.error('Delete error:', error.message)
      return res.status(500).json({ error: "Delete failed" })
    }

    console.log(`✅ Deleted ${ids.length} contacts`)
    res.json({ success: true })

  } catch (err) {
    console.error('Delete error:', err)
    res.status(500).json({ error: "Delete failed" })
  }
}

/**
 * Health Check Endpoint
 * Used to verify server is running
 */
export const healtz = (req, res) => {
  res.status(200).send('OK');
}
