# 📧 ProveIt Email Template Tracker

This document tracks all email communications used by ProveIt.

---

## 1. Magic Link (Login & First Verify)

**Trigger:** User enters email in Settings → Email Reports → Verify  
**Supabase Template:** Authentication → Email Templates → "Magic Link"

### Subject
```
Secure Access Link: ProveIt
```

### Body (HTML)
```html
<div style="font-family: sans-serif; color: #1a1a1a; max-width: 600px;">
  <h2>Access Request</h2>
  <p>We received a request to access your ProveIt dashboard or verify this email address for reports.</p>

  <p><strong>If this was you:</strong> Use the secure link below. This will verify your identity and log you in locally.</p>

  <p style="margin: 20px 0;">
    <a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=magiclink" 
       style="background-color: #c45d2c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
       Confirm Identity & Access Data
    </a>
  </p>

  <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />

  <h4 style="margin-bottom: 5px;">🔒 Our Privacy Promise</h4>
  <p style="font-size: 13px; color: #666; line-height: 1.5;">
    ProveIt uses a "Local-First" architecture. Your bias statistics, "lean" score, and reading history are calculated on your device and stored in your browser. 
    We do not sell your data or track you across the web. Verifying this email simply ensures that only YOU can generate reports from your local data.
  </p>
</div>
```

---

## 2. Change Email Address

**Trigger:** User changes their primary email in Settings  
**Supabase Template:** Authentication → Email Templates → "Change Email Address"

### Subject
```
Security Alert: Confirm New Email Address for ProveIt
```

### Body (HTML)
```html
<div style="font-family: sans-serif; color: #1a1a1a;">
  <h2>Confirm Email Change</h2>
  <p>You requested to move your ProveIt account to this email address.</p>
  <p><a href="{{ .ConfirmationURL }}">Confirm Change</a></p>
  <p style="font-size: 13px; color: #666;">If you did not request this, please ignore this email. Your account remains secure.</p>
</div>
```

---

## 3. Stale Security Re-verification (App Logic)

**Trigger:** User attempts to send a report after 30 days of inactivity  
**Mechanism:** 
- App checks `lastReportDate` in localStorage
- If > 30 days, forces sign out and prompts re-verification
- Uses Template #1 (Magic Link) when user re-enters email

**Note:** This is enforced in the app code (`SettingsView.jsx`), not a separate Supabase template.

---

## 4. Report Email (Future - Edge Function)

**Trigger:** User clicks "Send Instant Report" or scheduled delivery  
**Mechanism:** Supabase Edge Function (not yet implemented)

### Subject
```
Your ProveIt Reading Report - [Date]
```

### Body (planned)
```html
<div style="font-family: sans-serif; color: #1a1a1a; max-width: 600px;">
  <h2>Your Reading Report</h2>
  
  <p><strong>Lean Score:</strong> [score]</p>
  <p><strong>Articles Read:</strong> [count]</p>
  <p><strong>Source Diversity:</strong> [percentage]%</p>
  
  <h3>Distribution</h3>
  [Bias distribution chart/text]
  
  <h3>Top Sources</h3>
  [List of top 5 sources]
  
  <hr />
  
  <p style="font-size: 12px; color: #666;">
    This report was generated from your local ProveIt data. 
    Visit your dashboard for full details.
  </p>
</div>
```

---

## Supabase Configuration Checklist

### URL Configuration (Authentication → URL Configuration)

| Setting | Value |
|---------|-------|
| Site URL | `https://nymfarious.github.io` |
| Redirect URLs | `https://nymfarious.github.io/ProveIt` |
| | `https://nymfarious.github.io/ProveIt/` |
| | `http://localhost:5173` |

---

## Customization Notes

- All templates can be edited in Supabase Dashboard
- Variables like `{{ .SiteURL }}`, `{{ .TokenHash }}`, `{{ .ConfirmationURL }}` are provided by Supabase
- Keep the Privacy Promise section consistent across all templates
- Use ProveIt brand colors: Copper (#c45d2c), Ink (#1a1a1a), Paper (#f5f2e8)

---

## Version History

| Version | Changes |
|---------|---------|
| v2.3.0 | Initial email template documentation |
| | Added Privacy Promise to Magic Link |
| | Documented Stale Security logic |
