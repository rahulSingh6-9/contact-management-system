# Contact Page - Supabase Edition 🚀

A modern contact form application with an admin dashboard, built with **Express.js** and **Supabase** (PostgreSQL + Auth).

## ✨ Features

- 📝 **Contact Form** - Users can submit contact messages
- 📧 **Email Notifications** - Admin receives email when new contact arrives
- 🔐 **Admin Authentication** - Secure login with Supabase Auth
- 🔑 **Password Reset** - Admin can reset password via email
- 📊 **Admin Dashboard** - View all contacts, search, and delete messages
- 🛡️ **Row Level Security** - Database-level security with RLS policies
- 🎨 **Modern UI** - Beautiful, responsive design with gradients
- ⚡ **Production Ready** - Clean, modular code structure

## 🔄 Migration from MySQL to Supabase

This project has been **completely migrated** from MySQL (mysql2) to Supabase:

### What Changed

| Aspect | Before (MySQL) | After (Supabase) |
|--------|--------|----------|
| **Database** | MySQL with mysql2 driver | PostgreSQL (Supabase) |
| **Auth** | Custom with bcrypt/JWT | Supabase Auth |
| **Connection** | `mysql.createPool()` | `@supabase/supabase-js` |
| **Queries** | Raw SQL | Supabase client |
| **Password Reset** | Not implemented | Built-in via Supabase Auth |
| **Security** | Basic | RLS Policies + Auth |

### What Was Removed

❌ mysql2 dependency  
❌ bcrypt package  
❌ jsonwebtoken package  
❌ Custom password hashing logic  
❌ Manual JWT token generation  

### What Was Added

✅ @supabase/supabase-js  
✅ Supabase Auth integration  
✅ Password reset via email  
✅ RLS (Row Level Security) policies  
✅ Production-ready session management  

## 📋 Prerequisites

- **Node.js** v16+ (check with `node --version`)
- **npm** (comes with Node.js)
- **Supabase Account** (free tier is fine) - [Sign up](https://app.supabase.com)
- **Email Service** (Gmail, Outlook, or any SMTP server)

## 🚀 Quick Start

### Step 1: Clone and Setup

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env
```

### Step 2: Create Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Fill in project details and wait for it to start
4. Go to **Settings > API** and copy:
   - **Project URL** → `SUPABASE_URL` in `.env`
   - **anon public** key → `SUPABASE_ANON_KEY` in `.env`

### Step 3: Setup Database

1. In Supabase, go to **SQL Editor**
2. Copy the entire content from `MIGRATION.sql`
3. Paste and execute it (click ▶️ Run)
4. Check the "contact_messages" table is created ✅

### Step 4: Create Admin User

1. In Supabase, go to **Authentication > Users**
2. Click **Add User** (top right)
3. Enter:
   - **Email**: `admin@yourdomain.com` (or any email)
   - **Password**: Enter a strong password (remember this!)
   - **Auto Confirm User**: Toggle ON
4. Click **Save**

### Step 5: Configure Email (SMTP)

Edit your `.env` file with your email settings:

**For Gmail:**
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password  # NOT your regular password!
```

> To get app password: [Google Account > Security > App passwords](https://support.google.com/accounts/answer/185833)

**For Outlook:**
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your_email@outlook.com
EMAIL_PASS=your_password
```

### Step 6: Run the Application

```bash
npm start
```

Server will start at `http://localhost:8080`

### Step 7: Test It!

1. **Contact Form**: http://localhost:8080/
   - Fill in name, email, message
   - Click "Send Message"
   - Check your email for notification ✅

2. **Admin Login**: http://localhost:8080/login
   - Email: `admin@yourdomain.com` (created in Step 4)
   - Password: Your strong password
   - View all contacts in dashboard ✅

3. **Password Reset**:
   - On login page, click "Forgot Password?"
   - Enter admin email
   - Check email for reset link ✅

## 📁 Project Structure

```
Contact Page/
├── app.js                          # Express server setup
├── package.json                    # Dependencies
├── .env.example                    # Environment template
├── MIGRATION.sql                   # Database setup script
├── README.md                       # This file
│
├── config/
│   └── supabase.js                # Supabase client initialization
│
├── controllers/
│   ├── auth.controller.js         # Login, logout, password reset
│   ├── contact.controller.js      # Contact form, admin API
│   └── pages.controller.js        # Page rendering
│
├── routes/
│   └── contact.routes.js          # All route definitions
│
├── views/
│   ├── contact.html              # Contact form page
│   ├── login.html                # Admin login page
│   └── admin.html                # Admin dashboard
│
├── utils/
│   └── mailer.js                 # Email configuration
│
└── public/
    └── image/                     # Static assets
```

## 🔑 API Endpoints

### Public Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/` | Contact form page |
| POST | `/` | Submit contact message |
| GET | `/login` | Admin login page |
| GET | `/healthz` | Health check |

### Admin-Only Endpoints

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| GET | `/admin` | Session | Admin dashboard |
| GET | `/api/contacts` | Session | Get all contacts (with search) |
| POST | `/api/contacts/delete` | Session | Delete selected contacts |
| GET | `/logout` | Session | Logout |

### Auth Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/login` | Admin login |
| POST | `/api/reset-password` | Send password reset email |

## 🔐 Security Features

### 1. Row Level Security (RLS)
Database-level access control:
- **Public Users**: Can only INSERT (submit contacts)
- **Authenticated Admins**: Can SELECT, UPDATE, DELETE
- **Direct SQL Calls**: Cannot bypass RLS policies

### 2. Session Management
- Secure session cookies with HTTP-only flag
- Auto-expiry after 24 hours
- Clear session on logout

### 3. Password Security
- Handled by Supabase Auth (bcrypt hashing)
- Password reset via email tokens
- Tokens expire after 1 hour

### 4. Environment Variables
- All secrets in `.env` (not in git)
- Different keys for development/production
- Service role key kept secret (backend only)

## 🛠️ Environment Variables

```env
# Required
SUPABASE_URL=                    # Your Supabase project URL
SUPABASE_ANON_KEY=               # Supabase anonymous key

# Email (for notifications)
EMAIL_HOST=                      # SMTP server
EMAIL_PORT=                      # SMTP port (usually 587)
EMAIL_USER=                      # Your email address
EMAIL_PASS=                      # Email password/app password

# Optional
PORT=8080                        # Server port
SESSION_SECRET=                  # Session encryption key
NODE_ENV=development             # development or production
BASE_URL=http://localhost:8080   # For password reset links
```

## 🐛 Troubleshooting

### "Cannot connect to Supabase"
- [ ] Check `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `.env`
- [ ] Make sure your Supabase project is running
- [ ] Verify RLS policies are enabled

### "Login fails"
- [ ] Confirm admin user exists in Supabase Auth
- [ ] Use correct email (case-sensitive!)
- [ ] Try password reset if forgotten

### "Email not sending"
- [ ] Check SMTP credentials in `.env`
- [ ] For Gmail: Use [app password](https://support.google.com/accounts/answer/185833), not regular password
- [ ] Check firewall/network allows SMTP port (587)

### "Contacts not appearing"
- [ ] Check admin is logged in (session valid)
- [ ] Verify contacts table has data in Supabase
- [ ] Check browser console for API errors

### "Can't access /admin"
- [ ] Make sure you're logged in
- [ ] Session cookie might be deleted
- [ ] Try clearing browser cache and login again

## 📚 Code Quality

### Comments & Documentation
- All functions have JSDoc comments
- Complex logic explained inline
- Migration notes in file headers

### Modular Structure
- Controllers handle business logic
- Routes manage endpoints
- Config files separated from app logic
- Reusable utility functions

### Error Handling
- Try-catch blocks for async operations
- Meaningful error messages
- Logging for debugging

## 🚀 Deployment

### For Production (Heroku, Railway, Render)

1. **Update `.env`** with production values:
   ```env
   NODE_ENV=production
   SESSION_SECRET=your_random_secret_key
   BASE_URL=https://your-domain.com
   ```

2. **Update SMTP**:
   - Use production-grade email service (SendGrid, Mailgun, etc.)
   - Verify domain for better deliverability

3. **Update Database**:
   - Use Supabase's production instance
   - Set up backups and monitoring

4. **Security Checklist**:
   - [ ] Never commit `.env` to git
   - [ ] Use different credentials for dev/prod
   - [ ] Enable HTTPS
   - [ ] Update SESSION_SECRET
   - [ ] Test password reset flow

## 📖 Learn More

- [Supabase Docs](https://supabase.com/docs)
- [Express.js Guide](https://expressjs.com/)
- [PostgreSQL Tutorial](https://www.postgresql.org/docs/)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

## 📝 License

This project is open source and available for personal/commercial use.

## 🎯 Improvements Made

### From Original Code
✅ Removed manual JWT token generation  
✅ Replaced mysql2 with Supabase client  
✅ Added password reset functionality  
✅ Implemented database-level RLS  
✅ Better error handling  
✅ Added detailed comments  
✅ Production-ready structure  
✅ Security improvements  

### Future Enhancements
- [ ] Rate limiting on contact form
- [ ] File upload support
- [ ] Export contacts to CSV
- [ ] Email templates with HTML
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Webhook notifications

## ❓ Need Help?

1. Check the `.env.example` file
2. Review `MIGRATION.sql` for database setup
3. Check browser console (F12) for errors
4. See `TROUBLESHOOTING` section above
5. Read Supabase documentation

---

**Happy coding! 🎉**
