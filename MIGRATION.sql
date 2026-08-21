-- ===== CONTACT PAGE - SUPABASE MIGRATION SCRIPT =====
-- Copy and paste this SQL into Supabase SQL Editor to set up the database

-- ===== 1. CREATE contact_messages TABLE =====
CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  ip_address VARCHAR(45),
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ===== 2. CREATE INDEXES =====
CREATE INDEX idx_contact_messages_email ON contact_messages(email);
CREATE INDEX idx_contact_messages_name ON contact_messages(name);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);

-- ===== 3. ENABLE ROW LEVEL SECURITY (RLS) =====
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- ===== 4. RLS POLICIES FOR contact_messages =====

-- Policy 1: Public users can INSERT their own contact messages
CREATE POLICY "Anyone can insert contact messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

-- Policy 2: Only authenticated admins can SELECT all contacts
CREATE POLICY "Only authenticated users can view contacts"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (true);

-- Policy 3: Only authenticated admins can DELETE contacts
CREATE POLICY "Only authenticated users can delete contacts"
  ON contact_messages FOR DELETE
  TO authenticated
  USING (true);

-- Policy 4: Only authenticated admins can UPDATE contacts (e.g., mark as read)
CREATE POLICY "Only authenticated users can update contacts"
  ON contact_messages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ===== 5. CREATE ADMIN USERS =====
-- Note: Replace email and password with your actual admin credentials
-- You can also do this through the Supabase Dashboard:
-- Authentication > Users > Add User

-- Example admin user (create via Dashboard instead):
-- Email: admin@example.com
-- Password: [your-strong-password]

-- ===== 6. SETUP NOTES =====
-- After running this script:
--
-- 1. Create admin users in Supabase Auth:
--    - Go to Authentication > Users in Supabase Dashboard
--    - Click "Add User"
--    - Enter email and set a password
--    - This email will be used as "admin_id" in login
--
-- 2. Test the setup:
--    - Try logging in with admin credentials
--    - Submit a contact form
--    - Check if message appears in admin dashboard
--
-- 3. Verify RLS Policies:
--    - Public users should be able to submit contacts
--    - Only logged-in admins should see all contacts
--    - Unauthenticated users should NOT see contacts
--
-- ===== 7. IMPORTANT SECURITY NOTES =====
--
-- 1. RLS (Row Level Security):
--    - Protects data at the database level
--    - Prevents unauthorized access to sensitive data
--    - Policies are enforced even for direct API calls
--
-- 2. Session Management:
--    - User sessions are managed by express-session
--    - Admin authentication is handled by Supabase Auth
--    - Tokens are stored securely in sessions
--
-- 3. Password Reset:
--    - Uses Supabase Auth's built-in password reset flow
--    - Reset links are sent via email
--    - Tokens expire after a certain time for security
--
-- ===== TROUBLESHOOTING =====
--
-- Q: Why can't I login?
-- A: Make sure you've created an admin user in Supabase Auth,
--    and the email matches what you're trying to login with.
--
-- Q: Why aren't contacts being saved?
-- A: Check your RLS policies. The public INSERT policy must be enabled.
--
-- Q: Why can't I see contacts in admin panel?
-- A: Make sure you're logged in as an admin user.
--    RLS policies will hide contacts from unauthenticated users.
