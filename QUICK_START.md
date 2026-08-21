# ⚡ Quick Start Guide

**Get your Contact Page running with Supabase in 5 minutes!**

---

## 🎯 In a Nutshell

| Step | Time | Action |
|------|------|--------|
| 1️⃣ | 1 min | Copy `.env.example` → `.env` |
| 2️⃣ | 1 min | Create Supabase project & get credentials |
| 3️⃣ | 1 min | Run SQL migration in Supabase |
| 4️⃣ | 1 min | Create admin user in Supabase Auth |
| 5️⃣ | 1 min | Set email credentials in `.env` |

---

## ⚡ Step-by-Step

### Step 1: Prepare Environment Variables (1 min)

```bash
# Copy the template
cp .env.example .env

# Now you'll see a .env file in your project
# We'll fill it in the next steps
```

### Step 2: Create Supabase Project (2 min)

1. Go to [app.supabase.com](https://app.supabase.com)
2. Click **"New Project"**
3. Fill in:
   - Name: "Contact Page"
   - Password: any strong password (you won't need it)
   - Region: closest to you
4. Wait for it to start (2-3 min) ⏳

### Step 3: Get Supabase Credentials (1 min)

1. In your Supabase dashboard, click **"Settings"** → **"API"**
2. Copy these two values:
   ```
   Project URL
   anon public key
   ```
3. Paste into your `.env` file:
   ```env
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOi...
   ```

### Step 4: Create Database Tables (1 min)

1. In Supabase, go to **"SQL Editor"** → **"New Query"**
2. Open `MIGRATION.sql` file from your project
3. Copy all content (Ctrl+A, Ctrl+C)
4. Paste into Supabase SQL editor
5. Click **"RUN"** button
6. Done! ✅ (You'll see "Successfully executed")

### Step 5: Create Admin User (1 min)

1. In Supabase, go to **"Authentication"** → **"Users"**
2. Click **"Add User"** button
3. Enter:
   - Email: `admin@example.com` (or use your email)
   - Password: strong password (remember it!)
   - Toggle **"Auto Confirm User"** ON
4. Click **"Save"** ✅

### Step 6: Setup Email (2-3 min)

Choose your email provider:

**For Gmail:**
1. Go to [Google Account](https://myaccount.google.com) → **"Security"**
2. Find **"App passwords"** → Generate app password
3. Copy the 16-character password
4. Update `.env`:
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_gmail@gmail.com
   EMAIL_PASS=xxxx xxxx xxxx xxxx
   ```

**For Outlook:**
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your_email@outlook.com
EMAIL_PASS=your_password
```

### Step 7: Install & Run (1 min)

```bash
# Install dependencies (one time)
npm install

# Start the server
npm start
```

You should see:
```
╔════════════════════════════════════════╗
║  Contact Page - Supabase Version       ║
║  Server running on port 8080           ║
╚════════════════════════════════════════╝
```

### Step 8: Test Everything (2 min)

**Test Contact Form:**
1. Open http://localhost:8080
2. Fill in and submit a test message
3. Check your email inbox ✅

**Test Admin Login:**
1. Open http://localhost:8080/login
2. Use the email & password from Step 5
3. You should see the admin dashboard ✅
4. Your test message should appear in the table ✅

**Test Password Reset:**
1. Click "Forgot Password?"
2. Enter your admin email
3. Check email for reset link ✅

---

## ✅ You're Done! 🎉

Your Contact Page is now live and running with Supabase!

---

## 📖 Next Steps

1. **Customize** the app for your needs:
   - Change "Rahul" to your name in `admin.html`
   - Update portfolio link in `contact.html`
   - Customize email preview

2. **Deploy** to production:
   - Use Render, Railway, or Heroku
   - Update `.env` with production values
   - Set proper `SESSION_SECRET`

3. **Monitor** incoming contacts in admin dashboard

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Cannot connect to Supabase" | Check URL & key in `.env` - no extra spaces |
| "Login fails" | Verify admin user exists in Supabase Auth |
| "Email not sending" | Check SMTP credentials - use app password for Gmail |
| "Port 8080 in use" | Run `PORT=8081 npm start` instead |

For more help, read:
- **README.md** - Full documentation
- **SETUP_GUIDE.md** - Detailed step-by-step guide
- **MIGRATION_NOTES.md** - What changed from MySQL

---

## 📞 Support Resources

- [Supabase Docs](https://supabase.com/docs)
- [Express.js Guide](https://expressjs.com/)
- [Nodemailer Email Config](https://nodemailer.com/)

---

**Happy coding!** 🚀
