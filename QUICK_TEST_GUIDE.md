# ⚡ QUICK TEST - 5 MINUTES

## 🎯 Do This RIGHT NOW

### Step 1: Restart Dev Server
```bash
npm run dev
```
- Press Ctrl+C to stop
- Run command above
- Wait for "compiled successfully"

### Step 2: Test Contact Form (2 min)

1. Open: http://localhost:3000/services/asset-tracing
2. Scroll down, click **"Get Free Consultation"**
3. Fill form:
   ```
   Name: John Test
   Phone: +919999999999
   Email: john@test.com
   Message: Testing contact form
   ```
4. Click **"Request Callback"**

**Expected Results:**
- ✅ Green message: "Thank you! We received your request..."
- ✅ Check your email (john@test.com) - confirmation arrives
- ✅ Check admin email - notification arrives

### Step 3: Test Review Form (2 min)

1. Open: http://localhost:3000/reviews
2. Click **"Write a Review"**
3. Fill form:
   ```
   Name: Jane Test
   Email: jane@test.com
   Rating: 5 Stars
   Review: Amazing service! Highly recommended.
   ```
4. Click **"Submit"**

**Expected Results:**
- ✅ Green message: "Review submitted!"
- ✅ Refresh page - review appears in the list
- ✅ Check admin email - notification arrives

### Step 4: Verify Data Saved

**Open new terminal and run:**
```bash
# Check contact inquiries
cat data/inquiries.json

# Check reviews
cat data/testimonials.json
```

You should see your test data in JSON files ✅

---

## ❌ PROBLEMS?

### Email not arriving?
1. Check **Spam/Promotions folder** (Gmail)
2. Check **Resend dashboard** at https://resend.com/emails
3. Resend shows delivery status in real-time

### Form shows error?
1. Open browser console (F12)
2. Look for red error message
3. Check `.env.local` has API key

### Form shows nothing happens?
1. Check network tab (F12 → Network)
2. Look for `/api/inquiries` or `/api/testimonials` request
3. Should show **200 OK** (success) or **500 Error** (problem)

---

## 🚀 DEPLOY TO VERCEL

When ready to go live:

```bash
git add .
git commit -m "Fix email and reviews"
git push origin main
```

Vercel auto-deploys. Test live site same way as above.

**IMPORTANT:** Add your `.env.local` variables to Vercel first:
- Vercel Dashboard → Settings → Environment Variables
- Add: `RESEND_API_KEY=re_your_key_here`

---

## ✅ SUCCESS CHECKLIST

After testing, you should have:

- [x] Contact form submits and sends emails
- [x] Review form submits and shows on page
- [x] Admin receives all notifications
- [x] Data files created in `data/` folder
- [x] No errors in browser console

**If all ✅ - YOU'RE DONE! Email & Reviews are WORKING!**

---

## 📧 TEST EMAIL ADDRESSES

Use these for testing:

- **Your test email:** john@test.com (receives order confirmation)
- **Admin email:** pyinvestigationagency@gmail.com (receives notification)
- **From email:** onboarding@resend.dev (Resend default - works for testing)

Once domain verified (https://resend.com/domains), can use:
- **From email:** noreply@pyinvestigation.com (production)

---

Done! These fixes make email and reviews work. Start testing now! 🎉
