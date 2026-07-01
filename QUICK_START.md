# ⚡ Quick Start Guide

Get your portfolio running in 5 minutes!

## 🚀 Super Fast Setup (Copy-Paste)

### 1️⃣ Create Project
```bash
npm create vite@latest portfolio -- --template react
cd portfolio
npm install
```

### 2️⃣ Install Dependencies
```bash
npm install tailwindcss postcss autoprefixer framer-motion gsap lenis split-type
npm install -D tailwindcss postcss autoprefixer
```

### 3️⃣ File Setup
Copy these files to your project root:
- `portfolio-website.jsx` → `src/App.jsx`
- `styles.css` → `src/styles.css`
- `main.jsx` → `src/main.jsx`
- `index.html` → root
- `tailwind.config.js` → root
- `postcss.config.js` → root
- `vite.config.js` → root
- `package.json` → root (optional, merge if you already have one)

### 4️⃣ Run It
```bash
npm run dev
```

Visit: `http://localhost:3000`

---

## ✏️ Essential Customizations (Do This First!)

Open `src/App.jsx` and find these lines to change:

### 1. Your Name (Line ~230)
```jsx
<h1 ref={nameRef} className="hero-name">
  Alex Chen  // ← CHANGE THIS
</h1>
```

### 2. Your Roles (Line ~235)
```jsx
<p className="subtitle-line">Software Engineer</p>
<p className="subtitle-line">Full Stack Developer</p>
// ← CHANGE THESE
```

### 3. Your Skills (Line ~365)
```jsx
const skills = [
  { name: 'React', level: 'Expert', color: '#00F5FF' },
  // ADD YOUR SKILLS HERE
];
```

### 4. Your Projects (Line ~415)
```jsx
const projects = [
  {
    id: 1,
    title: 'Your Project Name', // ← CHANGE
    description: 'What it does', // ← CHANGE
    tech: ['React', 'Node.js'], // ← CHANGE
    github: 'https://github.com/you/project', // ← CHANGE
    demo: 'https://demo.com', // ← CHANGE
  },
];
```

### 5. Your Links (Line ~780)
```jsx
const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/yourname' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/yourname' },
  { name: 'Twitter', url: 'https://twitter.com/yourname' },
];
```

---

## 🎨 Change Colors (Optional)

Edit the top of `src/styles.css`:

```css
:root {
  --color-bg: #050816;           /* Dark background */
  --color-primary: #00F5FF;      /* Main color (cyan) */
  --color-secondary: #7B61FF;    /* Secondary (purple) */
  --color-accent: #FF2D95;       /* Accent (pink) */
}
```

**Quick color presets:**

**Cool Blue** (Professional)
```css
--color-primary: #0ea5e9;
--color-secondary: #3b82f6;
--color-accent: #06b6d4;
```

**Deep Purple** (Creative)
```css
--color-primary: #c084fc;
--color-secondary: #a855f7;
--color-accent: #ec4899;
```

**Neon Green** (Modern)
```css
--color-primary: #84cc16;
--color-secondary: #22d3ee;
--color-accent: #f97316;
```

---

## 📱 Test on Mobile

Open DevTools: `F12` → Click responsive icon → Select mobile devices

---

## 🚀 Deploy in 2 Minutes

### Option A: Netlify (Easiest)
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site"
4. Connect GitHub repo
5. Done! ✅

### Option B: Vercel
```bash
npm i -g vercel
vercel
# Answer the prompts
```

### Option C: GitHub Pages
```bash
npm run build
npm install -g gh-pages
gh-pages -d dist
# Repo → Settings → Pages → Select gh-pages branch
```

---

## ✨ Animations & Performance

### Slow Device?
Reduce particles in `portfolio-website.jsx`:
```jsx
{[...Array(50)].map((_, i) => (  // Change 100 to 50
  <FloatingParticle key={i} index={i} />
))}
```

### Want Faster Animations?
Edit `styles.css`:
```css
--transition-smooth: all 0.15s; /* Reduced from 0.3s */
```

### Disable Background Movement?
Comment this line in `AnimatedBackground`:
```jsx
// <div className="aurora-effect" />
```

---

## 🐛 Quick Fixes

| Problem | Fix |
|---------|-----|
| Page loads slowly | Run `npm run build` and check file size |
| Cursor not showing | Make sure browser window is in focus |
| Mobile looks weird | Check responsive width 480px in DevTools |
| Animations choppy | Reduce particle count or animation duration |
| Colors wrong | Verify hex codes in CSS (should start with #) |
| Can't edit files | Make sure you're in `src/` directory |

---

## 📋 Before You Deploy

- [ ] Changed your name and email
- [ ] Updated all social links
- [ ] Added your real projects
- [ ] Tested on mobile
- [ ] Checked all links work
- [ ] Ran `npm run build` successfully
- [ ] Added favicon to `public/favicon.ico`

---

## 🎉 You're Done!

Your portfolio is live! 

### Next Steps:
1. Share your portfolio link
2. Keep updating projects
3. Monitor performance with Lighthouse
4. Get feedback from others

---

## 📚 Need Help?

1. **Setup Issues?** → Read `SETUP_GUIDE.md`
2. **Want to customize more?** → Check `README.md`
3. **Code not working?** → Check browser console (F12)
4. **Want to add something?** → Search the component name in `App.jsx`

---

**Made with 💙 for your success!**

Good luck! 🚀
