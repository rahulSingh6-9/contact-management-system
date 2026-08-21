import dotenv from 'dotenv'
import { supabase } from '../config/supabase.js'

dotenv.config()

export const loginAdmin = async (req, res, next) => {
  try {
    const { admin_id, password } = req.body

    // Validate inputs
    if (!admin_id || !password) {
      return res.redirect('/login?error=invalid')
    }

    // Authenticate user with Supabase Auth
    // Note: Supabase Auth uses email, so we treat admin_id as email
    const { data, error } = await supabase.auth.signInWithPassword({
      email: admin_id,
      password: password
    })

    if (error || !data.user) {
      console.error('Login error:', error?.message)
      return res.redirect('/login?error=1')
    }

    // Store session info
    req.session.admin = {
      id: data.user.id,
      email: data.user.email,
      token: data.session.access_token
    }

    console.log(`✅ Admin logged in: ${data.user.email}`)
    res.redirect('/admin')

  } catch (error) {
    console.error('Login error:', error)
    res.redirect('/login?error=server')
  }
}

export const logout = async (req, res) => {
  try {
    // Sign out from Supabase
    await supabase.auth.signOut()

    // Clear session
    req.session.admin = null
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send('Logout failed')
      }
      res.redirect('/login')
    })
  } catch (error) {
    console.error('Logout error:', error)
    res.redirect('/login')
  }
}

/**
 * Password Reset - Send reset email via Supabase Auth
 * Expects: { email }
 */
export const resetPassword = async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.BASE_URL || 'http://localhost:8080'}/update-password`
    })

    if (error) {
      console.error('Password reset error:', error.message)
      return res.status(400).json({ error: 'Failed to send reset email' })
    }

    res.json({ success: true, message: 'Password reset email sent! Check your inbox.' })

  } catch (error) {
    console.error('Password reset error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

/**
 * Update Password - Update password after reset
 * Expects: { password } (from reset link)
 */
export const updatePassword = async (req, res) => {
  try {
    const { password } = req.body

    if (!password) {
      return res.status(400).json({ error: 'Password is required' })
    }

    // Update password for currently authenticated user
    const { error } = await supabase.auth.updateUser({
      password: password
    })

    if (error) {
      console.error('Password update error:', error.message)
      return res.status(400).json({ error: 'Failed to update password' })
    }

    res.json({ success: true, message: 'Password updated successfully!' })

  } catch (error) {
    console.error('Password update error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}
