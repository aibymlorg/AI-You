# Authentication System - Two Options

Your AI & YOU app now supports **TWO authentication methods**. Choose based on your needs:

---

## Option 1: localStorage (Simple - Already Working) ✅

**Best for:**
- Quick classroom demos
- Single-session presentations
- No setup required

**How it works:**
- Data stored in browser
- No database needed
- Works immediately

**Already implemented!** Just use the app as-is.

---

## Option 2: Supabase (Production - Cross-Device) 🚀

**Best for:**
- Multi-day use
- Students accessing from home
- Real leaderboards across all students
- Persistent data that never gets lost

**Requires:**
- 5 minutes of setup
- Free Supabase account (no credit card)

**Setup Instructions:**
👉 See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for complete guide

**Quick summary:**
1. Create free Supabase account at [supabase.com](https://supabase.com)
2. Create new project
3. Run SQL script (provided in setup guide)
4. Copy API keys to `.env.local`
5. Done! ✅

---

## Current Status

🔧 **Code is ready for both!**

- ✅ localStorage auth working (services/authService.ts)
- ✅ Supabase auth ready (services/authServiceSupabase.ts)
- ✅ Currently using: **Supabase** (authServiceSupabase.ts)

---

## How to Switch Between Methods

### To use localStorage (no database):
Edit these files and change imports:

**`components/LandingPage.tsx`:**
```typescript
// Change FROM:
import { getCurrentPlayer, logoutPlayer } from '../services/authServiceSupabase';

// Change TO:
import { getCurrentPlayer, logoutPlayer } from '../services/authService';
```

**`components/AuthModal.tsx`:**
```typescript
// Change FROM:
import { registerPlayer, loginPlayer } from '../services/authServiceSupabase';

// Change TO:
import { registerPlayer, loginPlayer } from '../services/authService';
```

### To use Supabase (database):
Keep current imports (already set to Supabase)

Just add your Supabase credentials to `.env.local`:
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

---

## Deployment to Vercel

### With localStorage:
- No extra configuration needed
- Deploy as-is

### With Supabase:
1. Add environment variables in Vercel dashboard:
   - `VITE_API_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
2. Redeploy
3. Done!

---

## Need Help?

- **Supabase Setup**: Read [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
- **Can't decide?**: Start with localStorage, upgrade to Supabase later if needed
- **Errors?**: Check browser console for details

---

## Feature Comparison

| Feature | localStorage | Supabase |
|---------|-------------|----------|
| Setup time | 0 min ✅ | 5 min |
| Cross-device | ❌ | ✅ |
| Data persistence | Browser only | Forever |
| Leaderboards | Local only | Global |
| Cost | Free | Free (50k users) |
| Security | Browser-level | Database-level |
| Best for | Demos | Production |

Choose what's best for your use case! 🎯
