# 📧 Email Setup Guide (EmailJS)

Your contact form is now integrated with **EmailJS**! Follow these steps to make it fully functional:

## 🚀 Quick Setup (5 minutes)

### Step 1: Sign Up for EmailJS
1. Go to https://www.emailjs.com/
2. Click **"Sign Up"** (top right)
3. Create a free account using your email
4. Verify your email

### Step 2: Get Your Public Key
1. After login, go to the **Dashboard**
2. Click on **"Account"** in the left sidebar
3. Copy your **Public Key** (you'll need this)88-DfWPEZqF_P2WOp
4. Save it somewhere safe

### Step 3: Create an Email Service
1. In the Dashboard, click **"Email Services"** (left sidebar)
2. Click **"Add Service"** button
3. Select **"Gmail"** (or your preferred email provider)
4. Follow the authentication steps
5. Note down your **Service ID** service_wqmozjn

### Step 4: Create an Email Template
1. Go to **"Email Templates"** in the sidebar
2. Click **"Create New Template"**
3. Name it: `portfolio_contact_form`
4. Use this template:

```
From: {{from_name}} <{{from_email}}>
To: {{to_email}}
Subject: New Portfolio Message from {{from_name}}

---

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
Reply To: {{reply_to}}
```

5. Click **"Save"**
6. Note down your **Template ID**

### Step 5: Update Your Code
Open `src/App.jsx` and find these lines (around line 5-7):

```jsx
// Initialize EmailJS (Replace with your actual Public Key)
emailjs.init('YOUR_PUBLIC_KEY_HERE');
```

Replace with your actual Public Key:
```jsx
emailjs.init('pk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
```

Then find the `handleSubmit` function (around line 910-915) and update these values:

```jsx
await emailjs.send(
  'service_xxxxxxxxxxxx',      // ← Replace with YOUR SERVICE ID
  'template_xxxxxxxxxxxx',     // ← Replace with YOUR TEMPLATE ID
  {
    to_email: 'your_actual_email@gmail.com', // ← Replace with YOUR EMAIL
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
    reply_to: formData.email,
  }
);
```

## ✅ Test Your Form

1. Save the file
2. Go to http://localhost:3000 (your dev server)
3. Fill out the contact form
4. Click "Send Message"
5. Check your email inbox in a few seconds!

## 🎉 Done!

Messages from your portfolio will now go directly to your inbox. You can reply to them directly from your email!

---

## 🔧 Troubleshooting

### "Failed to send message"
- Check that all IDs are correct (copy-paste them carefully)
- Make sure you're using the exact template format
- Verify EmailJS email service is connected

### Not receiving emails?
- Check spam/promotions folder
- Verify email address in the code matches your Gmail
- Make sure template is published

### Can't find Service/Template IDs?
- Service ID: Dashboard → Email Services → Your Service → (copy from URL or settings)
- Template ID: Email Templates → Your Template → (copy from dashboard)

---

## 🌐 Deployment

When deploying (Netlify, Vercel, etc.), your EmailJS credentials will work across all devices! 🚀

