# 🎓 MentorLagbe — Smart Tuition & Mentorship Platform (Client)

A modern full-stack EdTech platform connecting qualified academic mentors with ambitious learners across Bangladesh. Built with **Next.js (App Router, Pure JSX)**, **Tailwind CSS**, **Better Auth & JWT**, and **Stripe Checkout**.

---

## 🌐 Live URLs & Demo Credentials
- **Live Client URL:** [https://mentor-lagbe-naki.vercel.app](https://mentor-lagbe-naki.vercel.app) *(Deploy on Vercel)*
- **Live Server URL:** [https://mentorlagbe-server.vercel.app](https://mentorlagbe-server.vercel.app)

### 🔑 Test Credentials (for quick evaluation):
| Role | Email | Password | Access / Privileges |
| :--- | :--- | :--- | :--- |
| **Admin** | `shahriarahmedriaz_admin@mentrolagbe.com` | `mentrolagbe_passDeboNa` | Tuition approval, role management, Stripe revenue |
| **Tutor** | `shahriarahmedriaz.tutor@mentorlagbe.com` | `riaz_KI_mentor?` | Post tuitions, manage applicants, edit/delete batches |
| **Student** | `student.sadia@gmail.com` | `student12345` | Apply for tuitions, track status, bookmark favorites |

---

## ✨ Key Features

1. **Role-Based Authentication & Authorization:**
   - Seamless sign up with role selection (`Student` or `Tutor`).
   - Better Auth session sync with JWT token transmission to Express backend via `Authorization: Bearer <token>`.
   - Role-based dashboard layouts with collapsible responsive sidebar and user profile indicators.

2. **Public Browse Tuitions with Search & Filter:**
   - **Challenge 1:** Dynamic server-side search by title, subject, location, or tutor name.
   - Multi-criteria filter dropdowns for Subject, Class Level, Mode (Online / Offline), and Fee sorting.
   - **Optional 1:** Server-side pagination controls with MongoDB `.skip()` and `.limit()`.

3. **Role-Restricted Student Application Flow:**
   - Only students can submit application requests.
   - Prevents duplicate applications from the same student for the same tuition batch.
   - Tutors and Admins receive a clear role warning notice.

4. **Stripe Subscription Upgrades:**
   - Pro Tutor Plan ($15) for unlimited tuition postings and verified badge.
   - Pro Student Plan ($10) for unlimited saved bookmarks and priority enrollment.
   - Automated database synchronization on successful checkout with confetti celebrations.

5. **Direct Image Upload via ImgBB API:**
   - **Challenge 3:** Direct file upload without pasting manual URLs, integrated into both Tuition Creation and Profile Editing.

6. **Interactive Feedback & Extras:**
   - Student ratings and review system for accepted applications.
   - Saved / Bookmarked tuitions with quota limits.
   - Custom skeleton loader (`loading.jsx`), error boundary (`error.jsx`), and 404 page (`not-found.jsx`).
   - Clean, modern UI inspired by BookNook aesthetic with Google Fonts (Outfit & Inter) and rebranded X social logo.

---

## 🛠️ NPM Packages Used
- `next` (App Router)
- `react` & `react-dom`
- `better-auth` (Authentication & Session Client)
- `react-hot-toast` (Toast alerts for form submissions and errors)
- `canvas-confetti` (Payment success visual celebration)
- `framer-motion` (Fluid UI animations)
- `@fortawesome/react-fontawesome` & `@fortawesome/free-solid-svg-icons` (Iconography)
- `tailwindcss`, `postcss`, `autoprefixer` (Modern styling)

---

## ⚙️ Environment Variables (.env.local)
Create a `.env.local` file in the `client` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_CLIENT_URL=http://localhost:3000
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
BETTER_AUTH_SECRET=super_secret_better_auth_session_key
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth 2.0 Credentials (Required on Client for Google Login)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com
GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your_google_client_secret_here
```

---

## 🔑 Google OAuth 2.0 Setup Guide
To enable the official **Continue with Google** login flow:

1. Go to [Google Cloud Console Credentials](https://console.cloud.google.com/apis/credentials).
2. Click **Create Credentials** -> **OAuth client ID**.
3. Choose Application Type: **Web application**.
4. Set **Authorized JavaScript origins**:
   - `http://localhost:3000`
   - `https://mentor-lagbe-naki.vercel.app`
5. Set **Authorized redirect URIs**:
   - `http://localhost:3000/auth/callback`
   - `https://mentor-lagbe-naki.vercel.app/auth/callback`
6. Copy the generated **Client ID** and **Client Secret**:
   - In `client/.env.local` (and Vercel Environment Variables), set:
     - `NEXT_PUBLIC_GOOGLE_CLIENT_ID=<your_client_id>` (Client side redirect)
     - `GOOGLE_CLIENT_ID=<your_client_id>`
     - `GOOGLE_CLIENT_SECRET=<your_client_secret>`
   - The Express server does **not** need the Secret; it is strictly managed on the Client / Next.js backend!

---

---

## 🚀 Getting Started
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open http://localhost:3000 in your browser
```
