# Admin Panel Setup & Access Guide

## Overview

The Admin Panel is a secure, password-protected dashboard that allows you to:
- ✅ View all customer visitor forms
- ✅ View contact form submissions
- ✅ View testimonials/reviews
- ✅ Export data as CSV
- ✅ Send data via email
- ✅ Manage reviews (approve/reject/delete)

---

## Quick Access

**Admin Panel URL:** `http://localhost:3000/admin`

**Login Page:** `http://localhost:3000/admin/login`

---

## Default Login Credentials

```
Email: pyinvestigationagency@gmail.com
Password: Parthi@1992..
```

⚠️ **IMPORTANT:** Change these credentials in `.env.local` or environment variables **immediately** in production!

---

## Change Admin Credentials

### Option 1: Using Environment Variables (Recommended)

1. Open `.env.local` file
2. Add or modify:
```env
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=your-secure-password
```
3. Restart the server

### Option 2: Change in Code (Not Recommended)

Edit `app/api/admin/login/route.ts`:
```typescript
const ADMIN_EMAIL = 'pyinvestigationagency@gmail.com'
const ADMIN_PASSWORD = 'Parthi@1992..'
```

---

## Features

### 1. **Visitor Forms Tab**
- View all customers who filled the mandatory popup form
- Shows: Name, Phone, WhatsApp Number, Email, Submission Date
- Download as CSV
- Email data to yourself

### 2. **Contact Forms Tab**
- View all contact form submissions
- Shows: Name, Email, Phone, Service Type, Message

### 3. **Reviews Tab**
- View all testimonials
- Approve pending reviews
- Reject reviews
- Delete reviews

### 4. **Export Data**
- **Download as CSV** - Export current tab data as CSV file
- **Send via Email** - Email CSV to any address

---

## Login Flow

1. Visit `http://localhost:3000/admin`
2. If not authenticated → Redirected to `/admin/login`
3. Enter email and password
4. Click "Login to Dashboard"
5. Session stored in browser (localStorage)
6. Access dashboard
7. Click "Logout" to exit

---

## Features Explained

### Session Management
- Token is stored in browser `localStorage`
- Token expires after 24 hours
- Closing browser doesn't automatically logout (session persists)
- Click "Logout" button to manually logout

### Security Notes
- Default credentials are visible (change immediately)
- Tokens are base64 encoded (simple security, not recommended for production)
- In production:
  - Use HTTPS only
  - Implement proper JWT tokens
  - Hash passwords
  - Use secure session management
  - Add rate limiting on login attempts
  - Add two-factor authentication

### Popup Exclusion
- The mandatory visitor form popup **does NOT appear** on admin pages
- Popup only shows on public website pages
- No visitor tracking on admin pages

---

## Admin Dashboard Sections

### Header
- Shows "Admin Dashboard" title
- Displays logged-in email
- Red "Logout" button

### Tabs
- **Contact Forms** - All form submissions
- **Visitor Forms** - All mandatory popup submissions
- **Reviews** - All testimonials

### Export Section
- Download current tab as CSV
- Send to email address

### Data Table
- Shows all records for current tab
- Sortable columns
- Status indicators
- Action buttons (for reviews)

### Summary Section
- Shows total count of current tab

---

## Production Checklist

- [ ] Change `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env.local`
- [ ] Use strong, unique password (minimum 12 characters)
- [ ] Store credentials securely (use environment variables)
- [ ] Enable HTTPS on your domain
- [ ] Consider implementing:
  - [ ] JWT tokens instead of base64
  - [ ] Password hashing (bcrypt)
  - [ ] Two-factor authentication
  - [ ] Rate limiting
  - [ ] Admin activity logs
  - [ ] IP whitelist

---

## Troubleshooting

### Cannot Login
- Verify email and password match `.env.local`
- Check if environment variables are loaded
- Restart server after changing credentials
- Clear browser cache/localStorage

### Session Expires
- Login again
- Session lasts 24 hours
- Click Logout to clear session

### Data Not Showing
- Ensure data files exist in `data/` directory
- Check file permissions
- Verify JSON file format

### CSV Export Fails
- Ensure data exists before exporting
- Check download folder permissions
- Try using "Send via Email" instead

---

## API Reference

### POST `/api/admin/login`
**Login with credentials**

Request:
```json
{
  "email": "admin@pyinvestigation.com",
  "password": "admin@123456"
}
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJlbWFpbCI6ICJhZG1pbiIsIC4uLn0=",
  "email": "admin@pyinvestigation.com"
}
```

---

### GET `/api/admin/login`
**Verify token**

Headers:
```
Authorization: Bearer eyJlbWFpbCI6ICJhZG1pbiIsIC4uLn0=
```

Response:
```json
{
  "success": true,
  "message": "Token is valid",
  "email": "admin@pyinvestigation.com"
}
```

---

## Next Steps

1. ✅ Access admin panel at `/admin/login`
2. ✅ Login with default credentials
3. ✅ View visitor forms and data
4. ✅ Export data as CSV
5. ✅ Change credentials in `.env.local`
6. ✅ Restart server
7. ✅ Login with new credentials

---

## Support

For issues or questions:
- Check browser console for errors
- Check server logs for API errors
- Verify credentials in `.env.local`
- Ensure data files exist in `data/` directory
- Check file permissions
