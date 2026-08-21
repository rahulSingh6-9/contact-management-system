# 🎯 Complete Setup Guide - Supabase Version

A **complete step-by-step visual guide** to set up your Contact Page with Supabase.

## Phase 1: Initial Setup (15 minutes)

### 1.1 Install Node.js

If you haven't already:
1. Go to https://nodejs.org/
2. Download LTS version
3. Install it (accept all defaults)
4. Verify installation:
   ```bash
   node --version   # Should show v16.x.x or higher
   npm --version    # Should show 8.x.x or higher
   ```

### 1.2 Get the Project Files

```bash
# Navigate to your project folder
cd "path/to/Contact Page"

# Install all dependencies
npm install
```

This will download:
- `express` - Web framework
- `@supabase/supabase-js` - Supabase client
- `dotenv` - Environment variables
- `nodemailer` - Email sending
- `express-session` - Session management

---

## Phase 2: Supabase Setup (20 minutes)

### 2.1 Create Supabase Account

1. Go to https://app.supabase.com/auth/sign-up
2. Sign up with your email (or GitHub account)
3. Verify your email
4. Login to dashboard

### 2.2 Create a New Project

1. Click **"New Project"** button
2. Fill in details:
   - **Name**: "Contact Page" (or any name)
   - **Database Password**: Use something strong (you won't need it again)
   - **Region**: Choose closest to you (e.g., "us-east-1")
3. Click **"Create New Project"**
4. Wait 2-3 minutes for project to start

> Screenshot: You'll see a nice dashboard with "Project Name" at top

### 2.3 Get Your Credentials

1. In Supabase dashboard, click **"Settings"** (bottom left)
2. Click **"API"** in the sidebar
3. Look for "Project Settings" box
4. Copy these two values:

   ```
   Project URL: https://xxxxxxxxxxxx.supabase.co
   Anon (Public) Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

5. Open your project's `.env` file and paste:
   ```env
   SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### 2.4 Setup Database Tables

1. In Supabase dashboard, go to **"SQL Editor"** (left sidebar)
2. Click **"New Query"** button
3. Open the `MIGRATION.sql` file in your project
4. Copy ALL the content (Ctrl+A, Ctrl+C)
5. Paste it into Supabase SQL editor
6. Click **"RUN"** button (or Ctrl+Enter)
7. You should see: **"Successfully executed"** ✅

> 🎯 Your database is now ready!

### 2.5 Create Admin User

1. In Supabase, go to **"Authentication"** (left sidebar)
2. Click **"Users"** in the submenu
3. Click **"Add User"** button (top right)
4. Fill in:
   - **Email**: `admin@example.com` (or your email)
   - **Password**: Create a strong password (remember it!)
   - **Auto Confirm User**: Toggle ON ✅
5. Click **"Save"**

> 🎯 Now you have an admin account!

---

## Phase 3: Email Setup (10 minutes)

Your app needs to send emails when contacts arrive.

### 3.1 Choose Your Email Provider

**Option A: Gmail (Recommended for beginners)**

1. Go to [Google Account Settings](https://myaccount.google.com)
2. Click **"Security"** (left sidebar)
3. Scroll to **"App passwords"** section
4. Click on it
5. You'll be asked to enter your password
6. Select:
   - App: **Mail**
   - Device: **Windows/Mac/Linux** (your OS)
7. Google will generate a 16-character password
8. Copy this password

Now update your `.env`:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_actual_email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx  # The 16-char password from Google
```

**Option B: Outlook/Hotmail**

```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your_email@outlook.com
EMAIL_PASS=your_outlook_password
```

**Option C: Other Email Providers**

Search "SMTP settings [your provider]" and update accordingly.

### 3.2 Test Email Setup

The app will automatically test email when you submit a contact form.

---

## Phase 4: Run Your Application (5 minutes)

### 4.1 Start the Server

```bash
npm start
```

You should see:
```
╔════════════════════════════════════════╗
║  Contact Page - Supabase Version       ║
║  Server running on port 8080           ║
╚════════════════════════════════════════╝
```

### 4.2 Open in Browser

1. Open http://localhost:8080 in your browser
2. You should see the **Contact Form** page
3. Try submitting a test message
4. Check your email for the notification ✅

### 4.3 Test Admin Login

1. Go to http://localhost:8080/login
2. Enter your admin email and password (from 2.5)
3. You should be redirected to **Admin Dashboard** ✅
4. You should see your test contact in the table

### 4.4 Test Password Reset

1. Go to http://localhost:8080/login
2. Click **"Forgot Password?"**
3. Enter your admin email
4. Check your email for reset link ✅

> Congratulations! Your app is fully set up! 🎉

---

## Phase 5: Customization (Optional)

### 5.1 Change Admin Welcome Message

In `views/admin.html`, find this line:
```html
<h2>Welcome, Rahul</h2>
```

Change "Rahul" to your name:
```html
<h2>Welcome, YourName</h2>
```

### 5.2 Change Contact Form Email Display

In `views/contact.html`, find:
```html
<p><strong>To:</strong> <span class="your-name">Rahul Singh</span> &lt;<span class="your-email">rj@yourdomain.com</span>&gt;</p>
```

Update to your info:
```html
<p><strong>To:</strong> <span class="your-name">Your Name</span> &lt;<span class="your-email">your_email@domain.com</span>&gt;</p>
```

### 5.3 Change Portfolio Link

In `views/contact.html`, find:
```html
<a href="https://rahul-portfolio-site-569m.onrender.com/" ...>
```

Replace with your portfolio URL:
```html
<a href="https://your-portfolio-url.com/" ...>
```

---

## 🐛 Troubleshooting

### Issue: "Cannot connect to Supabase"

**Solution:**
1. Double-check `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `.env`
2. Make sure there are no extra spaces
3. The URL should start with `https://`
4. Try restarting the server: `npm start`

### Issue: "Login fails with correct credentials"

**Solution:**
1. Go to Supabase > Authentication > Users
2. Verify admin user exists
3. Try resetting the password
4. Make sure "Auto Confirm User" was toggled ON when creating user

### Issue: "Emails not being sent"

**Solution:**
1. Check your SMTP credentials are correct
2. If using Gmail: Make sure you're using **app password**, not regular password
3. Try submitting a contact form and check browser console (F12) for errors
4. Check server logs for email error messages

### Issue: "Contacts not appearing in admin dashboard"

**Solution:**
1. Make sure you're logged in (session is valid)
2. Check the Supabase dashboard:
   - Go to SQL Editor
   - Run: `SELECT * FROM contact_messages;`
   - Should show your test contacts
3. If query returns nothing, contacts weren't saved
4. Check for errors in browser console

### Issue: "Port 8080 already in use"

**Solution:**
```bash
# Use a different port
PORT=8081 npm start
# Then open http://localhost:8081
```

---

## ✅ Verification Checklist

- [ ] Node.js installed and working
- [ ] Project dependencies installed (`npm install`)
- [ ] Supabase project created
- [ ] Credentials added to `.env`
- [ ] Database tables created (SQL ran successfully)
- [ ] Admin user created in Supabase Auth
- [ ] Email configured in `.env`
- [ ] Server starts without errors (`npm start`)
- [ ] Contact form page loads (http://localhost:8080)
- [ ] Can submit test contact
- [ ] Test email received
- [ ] Can login as admin
- [ ] Test contact appears in admin dashboard
- [ ] Password reset email works

If all checks pass: **Your app is production-ready!** 🚀

---

## 🎓 Next Steps

1. **Customize** the app for your needs (see Phase 5)
2. **Deploy** to production (Render, Railway, Heroku)
3. **Monitor** admin dashboard for incoming contacts
4. **Update** contact form with your actual email in preview

---

## 📞 Support

If you get stuck:
1. Re-read this guide carefully
2. Check the README.md file
3. Look at error messages in browser console (F12)
4. Check server terminal for error logs
5. Visit [Supabase Docs](https://supabase.com/docs)

**You've got this!** 💪
