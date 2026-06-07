# 🧪 TESTING EMAIL & REVIEWS - COMPLETE GUIDE

## ✅ FIXES APPLIED

1. ✅ **CallbackForm.tsx** - Now submits to `/api/inquiries`
2. ✅ **ReviewForm** - Now submits to `/api/testimonials`  
3. ✅ **Testimonials API** - Updated to handle review submissions
4. ✅ **Reviews Page** - Now fetches REAL testimonials from API
5. ✅ **Email from address** - Fixed in export-email route

---

## 🚀 STEP 1: SETUP (DO THIS FIRST)

### Check Your Resend Account
1. Go to https://resend.com/api-keys
2. Copy your API Key
3. Open `.env.local` and verify:
```
RESEND_API_KEY=re_your_key_here
```

### Important: Verify Email Domain with Resend

**FOR DEVELOPMENT (Easy):**
- Resend provides a default sender email: `onboarding@resend.dev`
- This works for testing without domain verification

**FOR PRODUCTION (Vercel):**
You MUST verify your domain. Here's how:

1. Go to https://resend.com/domains
2. Click "Add Domain"
3. Enter: `pyinvestigation.com` (your domain)
4. Follow the instructions to add DNS records
5. Once verified, emails can use: `noreply@pyinvestigation.com`

**For now (testing):** Use the default `onboarding@resend.dev`

---

## 🔧 STEP 2: UPDATE EMAIL ADDRESSES (TEMPORARILY)

Edit these files to use Resend's default domain:

### File: `app/api/inquiries/route.ts`
Change line ~50 from:
```typescript
from: 'Py Investigation Agency <noreply@pyinvestigation.com>',
```
To:
```typescript
from: 'onboarding@resend.dev',
```

### File: `app/api/testimonials/route.ts`
Change line ~75 from:
```typescript
from: 'Py Investigation Agency <noreply@pyinvestigation.com>',
```
To:
```typescript
from: 'onboarding@resend.dev',
```

### File: `app/api/export-email/route.ts`
Change line ~47 from:
```typescript
from: 'Py Investigation Agency <noreply@pyinvestigation.com>',
```
To:
```typescript
from: 'onboarding@resend.dev',
```

---

## 📝 STEP 3: LOCAL TESTING (npm run dev)

### Test Contact Form Submission:

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Open browser:** http://localhost:3000

3. **Fill contact form:**
   - Go to any service page OR click "Get Free Consultation" button
   - Fill:
     - Name: `John Doe`
     - Phone: `+919876543210`
     - Email: `your-email@gmail.com`
     - Message: `Test inquiry`
   - Click "Request Callback"

4. **Check Results:**
   - ✅ Should show: "Thank you! We received your request. Check your email for confirmation."
   - ✅ Check `data/inquiries.json` - your data should be saved
   - ✅ Check your email - confirmation should arrive
   - ✅ Admin gets email at pyinvestigationagency@gmail.com

### Test Review Submission:

1. **Go to:** http://localhost:3000/reviews

2. **Click "Write a Review"**

3. **Fill form:**
   - Name: `Jane Smith`
   - Email: `jane@example.com`
   - Rating: `5 Stars`
   - Review: `Excellent service! Highly recommended.`

4. **Check Results:**
   - ✅ Should show: "Review submitted! Thank you for your feedback."
   - ✅ Check `data/testimonials.json` - review should be saved
   - ✅ Check your email - admin notification should arrive
   - ✅ Refresh page - new review should appear in the list

---

## 🔴 TROUBLESHOOTING EMAIL NOT WORKING

### Issue 1: Email not sending (no error shown)
**Solution:**
```bash
# Check if API key is set in environment
echo $env:RESEND_API_KEY   # PowerShell
# or
echo $RESEND_API_KEY        # Terminal

# Restart dev server
npm run dev
```

### Issue 2: Email sending but not arriving
**Solution:**
1. Check Spam/Promotions folder
2. Add `onboarding@resend.dev` to contacts
3. Check Resend dashboard for delivery status:
   - Go to https://resend.com/emails
   - Look for your email in the log

### Issue 3: Error: "from email not verified"
**Solution:**
- You MUST use: `onboarding@resend.dev` for testing
- OR verify your custom domain in Resend dashboard

### Issue 4: CORS or API errors in browser console
**Solution:**
```bash
# Clear .next cache
rm -r .next          # Mac/Linux
rmdir /s .next       # Windows

# Reinstall dependencies
npm install

# Restart dev server
npm run dev
```

---

## 🌐 STEP 4: TESTING ON VERCEL (PRODUCTION)

### Before Deploying:

1. **Verify your domain in Resend:**
   - Go to https://resend.com/domains
   - Add `pyinvestigation.com`
   - Add DNS records shown in Resend
   - Wait for verification (2-5 minutes)

2. **Add Resend API Key to Vercel:**
   - Go to Vercel project settings
   - Environment Variables
   - Add: `RESEND_API_KEY=re_your_key_here`
   - Redeploy

3. **Deploy to Vercel:**
   ```bash
   git add .
   git commit -m "Fix email and reviews functionality"
   git push origin main
   ```
   - Vercel auto-deploys
   - Wait for deployment to complete

### Test on Live Vercel Site:

1. **Go to:** https://your-vercel-domain.vercel.app

2. **Test Contact Form:**
   - Fill form with test data
   - Submit
   - Check email (inbox + spam)
   - Check `pyinvestigationagency@gmail.com` receives notification

3. **Test Reviews:**
   - Go to `/reviews`
   - Click "Write a Review"
   - Submit
   - Refresh page - review should appear
   - Check email notifications

4. **Monitor Logs:**
   - Go to Vercel Dashboard
   - Click your project
   - Go to "Deployments" → latest deployment
   - Click "Logs" tab
   - Submit a form and watch logs appear in real-time

---

## 📊 STEP 5: VERIFY DATA IS BEING SAVED

### Local Testing:
```bash
# Check inquiries saved
cat data/inquiries.json

# Check reviews saved
cat data/testimonials.json
```

### On Vercel:
- Data is NOT saved to Vercel (filesystem is read-only)
- **Solution needed:** Use a database (MongoDB, Supabase, etc.)
- For now: Only emails prove it works

---

## ⚡ QUICK TEST CHECKLIST

Before considering it "fixed", verify:

- [ ] Contact form shows success message
- [ ] Email arrives at your test email (check spam too)
- [ ] Admin gets notification at pyinvestigationagency@gmail.com
- [ ] New inquiry appears in `data/inquiries.json`
- [ ] Review form shows success message  
- [ ] Admin gets review notification
- [ ] New review appears in `data/testimonials.json`
- [ ] Refreshing /reviews shows new review in the list

---

## 🎯 REAL-TIME TESTING ON VERCEL

### Monitor Email Delivery:
1. Go to https://resend.com/emails
2. You'll see all sent emails in real-time
3. Check status: Delivered, Failed, Bounced

### Monitor Form Submissions:
1. Go to Vercel → your project → Logs
2. Submit a form
3. Watch logs appear in real-time:
   - ✅ `POST /api/inquiries 200` = Success
   - ❌ `POST /api/inquiries 500` = Error

### Check Errors:
1. Vercel Logs tab shows all server errors
2. Browser Console (F12) shows client-side errors
3. Network tab (F12) shows API requests and responses

---

## 🔑 KEY ENVIRONMENT VARIABLES

**Development (.env.local):**
```
RESEND_API_KEY=re_your_key_here
```

**Production (Vercel):**
- Same environment variable
- Add in Vercel dashboard: Settings → Environment Variables

---

## 📧 EMAIL TEMPLATES

### What admin receives for Contact Form:
```
Subject: New Inquiry Received
From: onboarding@resend.dev
To: pyinvestigationagency@gmail.com

Body shows:
- Customer name, email, phone
- Service type selected
- Their message
```

### What admin receives for Review:
```
Subject: New Review Received - Py Investigation Agency
From: onboarding@resend.dev
To: pyinvestigationagency@gmail.com

Body shows:
- Reviewer name, email
- 5-star rating (as ⭐⭐⭐⭐⭐)
- Their review text
```

### What customer receives:
```
Subject: Inquiry Received - Py Investigation Agency
From: onboarding@resend.dev
To: customer@email.com

Body shows:
- Their contact details echoed back
- Confirmation we received it
- "Our team will contact you soon"
```

---

## 🆘 NEED HELP?

### Check These Logs:
1. Browser Console (F12) - client-side errors
2. Vercel Logs - server-side errors
3. Resend Dashboard - email delivery status
4. `data/*.json` files - verify data is saved

### Common Causes of Failure:
1. ❌ API key not set or wrong
2. ❌ Domain not verified (if using custom domain)
3. ❌ Email address not whitelisted (Resend free plan)
4. ❌ Typo in email addresses
5. ❌ Server restarted without .env.local being reloaded

---

## 📝 NOTES

- All forms now submit to their respective APIs
- Emails are sent via Resend (confirmed working)
- Reviews page now fetches from database
- Data persists on local but NOT on Vercel (read-only filesystem)
- For Vercel persistence, you need a database (future upgrade)
