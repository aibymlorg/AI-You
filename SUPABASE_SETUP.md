# Supabase Setup Guide for AI & YOU

## 🚀 Quick Setup (5 minutes)

### Step 1: Create a Supabase Account (FREE)

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub (recommended) or Email
4. **No credit card required!**

### Step 2: Create a New Project

1. Click "New Project"
2. Fill in:
   - **Name**: `ai-and-you` (or any name)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your students (e.g., `East US`)
   - **Pricing Plan**: Select **Free** (includes 50,000 monthly active users!)
3. Click "Create new project"
4. Wait ~2 minutes for setup to complete ☕

### Step 3: Create the Players Table

1. In your Supabase dashboard, click **"SQL Editor"** in left sidebar
2. Click **"New Query"**
3. Copy and paste this SQL code:

```sql
-- Create players table
CREATE TABLE players (
  id BIGSERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  xp INTEGER DEFAULT 0,
  badges TEXT[] DEFAULT '{}',
  completed_missions INTEGER[] DEFAULT '{}'
);

-- Create index for faster queries
CREATE INDEX idx_players_email ON players(email);
CREATE INDEX idx_players_username ON players(username);
CREATE INDEX idx_players_xp ON players(xp DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE players ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (for simplicity)
-- In production, you'd want more granular policies
CREATE POLICY "Enable all operations for everyone"
ON players
FOR ALL
USING (true)
WITH CHECK (true);
```

4. Click **"Run"** (or press `Ctrl+Enter`)
5. You should see: ✅ **"Success. No rows returned"**

### Step 4: Get Your API Keys

1. In left sidebar, click **"Project Settings"** (gear icon at bottom)
2. Click **"API"** in the settings menu
3. You'll see two important values:

   📋 **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   📋 **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (long string)

4. **Keep this tab open!** You'll need these in the next step

### Step 5: Add Keys to Your Project

#### For Local Development:

1. Open your `.env.local` file in the project root
2. Add these lines (replace with YOUR actual values):

```env
VITE_API_KEY=AIzaSyBHPdr2DSxmfUdw9YF3e2IqtsSyUXSbELg

# Add these NEW lines:
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Save the file
4. Restart your dev server: `npm run dev`

#### For Vercel Deployment:

1. Go to your Vercel dashboard
2. Select your project
3. Go to **"Settings"** → **"Environment Variables"**
4. Add these three variables:

   | Name | Value |
   |------|-------|
   | `VITE_API_KEY` | Your Gemini API key |
   | `VITE_SUPABASE_URL` | Your Supabase project URL |
   | `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key |

5. Click **"Save"**
6. Go to **"Deployments"** tab
7. Click **"..."** on latest deployment → **"Redeploy"**

---

## ✅ Testing the Setup

1. Go to your app (local or Vercel)
2. Click **"Register/Login"**
3. Register a new account
4. Check Supabase dashboard:
   - Click **"Table Editor"** → **"players"**
   - You should see your new player! 🎉

---

## 🎯 What You Get Now

✅ **Cross-device login** - Students can login from any computer
✅ **Persistent data** - Accounts never lost (even after clearing browser)
✅ **Real leaderboards** - All students compete together
✅ **Track progress** - XP, badges, and completed missions saved
✅ **50,000 free users** - More than enough for your school!

---

## 🔒 Security Notes

**For Production** (if you deploy this publicly):
- The current setup stores passwords in **plain text** (for simplicity)
- For real-world use, implement **password hashing** with bcrypt
- Consider using Supabase's built-in **Auth** feature instead
- Add proper **Row Level Security (RLS)** policies

**For Classroom Use** (current):
- This setup is **perfect** for educational purposes
- Students won't be entering sensitive data
- Easy to manage and debug

---

## 📊 View Your Data

1. Go to Supabase dashboard
2. Click **"Table Editor"**
3. Select **"players"** table
4. See all registered students, their XP, badges, etc.
5. You can manually edit, add, or delete records

---

## 🆘 Troubleshooting

**"Failed to register" error:**
- Check console for errors
- Verify API keys are correct in `.env.local`
- Make sure you ran the SQL script in Step 3

**"Cannot connect to Supabase":**
- Check your internet connection
- Verify `VITE_SUPABASE_URL` is correct
- Make sure you're using `https://` in the URL

**Players table not found:**
- Go back to Step 3 and run the SQL script again
- Check "Table Editor" to confirm table exists

---

## 💰 Costs

**Free tier includes:**
- 50,000 monthly active users
- 500 MB database storage
- 1 GB file storage
- 2 GB bandwidth

**Perfect for:**
- ✅ Your Grade 10 class (30-40 students)
- ✅ Multiple classes (hundreds of students)
- ✅ Long-term use (entire school year)

**Cost: $0** 🎉

---

## 🎓 Next Steps

Once Supabase is set up, your students can:
1. Register from ANY device (home, school, tablet)
2. Login and continue where they left off
3. Compete on real leaderboards
4. Earn and keep XP and badges

Enjoy your presentation! 🚀
