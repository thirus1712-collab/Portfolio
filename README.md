# S.Thirukumaran - Full Stack Personal Portfolio

A futuristic, high-performance Single-Page Personal Portfolio website built for **S.Thirukumaran** featuring a sleek dark theme (`#000000`), glowing Bright Pink (`#ff004f`) neon accents, interactive tabs, animated cards, smooth scrolling, and a full-stack backend with MySQL contact persistence, MongoDB portfolio data storage, and automated Excel export.

![Portfolio Preview](/client/public/images/hero_portrait.jpg)

---

## 🚀 Key Features

- **Single-Page Smooth Scrolling**: Sticky glassmorphic navbar with active section detection, smooth transitions between sections, and a mobile drawer menu.
- **Section 1 — Hero**: 100vh full-screen layout with continuous typing role animation, animated tech stack badges, download resume CTA button, and a parallax hero portrait blending into pitch black.
- **Section 2 — About Me**: Dedicated narrative about S.Thirukumaran, badminton passion, education at SRM Easwari and S.T. Johns, 4 interactive tech stack cards (10px lift & pink hover), and 3 interactive tabs (*Skills*, *Experience*, *Education*) with animated progress bars.
- **Section 3 — My Services**: 3 cards (*Web Design*, *UI/UX Design*, *App Design*) with 0.4s Bright Pink background transition, card lift, and icon zoom.
- **Section 4 — My Work**: 3 project cards (*Social Media App*, *Music App*, *Online Shopping App*) with slide-from-bottom pink overlays and "See More Projects" button.
- **Section 5 — Contact Me & Inquiries**:
  - Two-column layout with direct contact info (Email: `thirus1712@gmail.com`, Phone: `+91 8838010780`, GitHub, LinkedIn, Instagram, Twitter/X) and Download CV button.
  - Interactive Contact Form with real-time validation, error handling, and animated success notification.
  - **Automated Excel Export**: Every submission is automatically appended to `portfolio_contacts.xlsx` with `Name`, `Email`, `Message`, `Date`, and `Time`.
  - Direct Excel Download link (`/api/contact/download-excel`) for the owner to download inquiries anytime.
- **Full Stack Architecture**:
  - **MySQL**: Automatically creates table `portfolio_contacts` and inserts submissions.
  - **MongoDB**: Supports storing and dynamically serving projects, services, skills, experience, and education collections.
  - **Zero-Crash Resilient Fallback**: Out-of-the-box local and preview execution even before database credentials are entered.
- **Vercel Deployment**: Serverless function handler (`api/index.js`) and `vercel.json` configured.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18 (Vite), Pure Vanilla CSS3, Lucide Icons, Google Font Poppins |
| **Backend** | Node.js, Express.js |
| **Databases** | MySQL (for contact inquiries), MongoDB (for portfolio data) |
| **File Export**| `xlsx` (SheetJS) for auto-generating `portfolio_contacts.xlsx` |
| **Deployment** | Vercel (Frontend static assets + Serverless API) |

---

## 📂 Project Structure

```
Thira/
├── client/                     # Vite + React Frontend
│   ├── public/
│   │   ├── images/             # High-res generated assets
│   │   │   ├── hero_portrait.jpg
│   │   │   ├── project_social.jpg
│   │   │   ├── project_music.jpg
│   │   │   └── project_ecommerce.jpg
│   │   └── S_Thirukumaran_Resume.pdf
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx      # Navigation bar & mobile menu
│   │   │   ├── Hero.jsx        # 100vh Hero & Typing animation
│   │   │   ├── About.jsx       # About description, Tech Stack & Tabs
│   │   │   ├── Services.jsx    # 3 Service cards (0.4s pink hover)
│   │   │   ├── Portfolio.jsx   # 3 Project cards (Bottom-to-top overlay)
│   │   │   ├── Contact.jsx     # Contact info & validated form
│   │   │   ├── Footer.jsx      # Copyright & Heart
│   │   │   └── BackToTop.jsx   # Floating back-to-top button
│   │   ├── App.jsx
│   │   ├── index.css           # Design tokens, pure black, neon pink
│   │   └── main.jsx
│   └── vite.config.js          # API proxy configuration
├── server/                     # Express.js Backend
│   ├── config/
│   │   ├── mysql.js            # MySQL connection & auto table creation
│   │   └── mongodb.js          # MongoDB Mongoose connector
│   ├── controllers/
│   │   ├── contactController.js # Validation, MySQL insert, Excel export
│   │   └── portfolioController.js # Dynamic MongoDB portfolio endpoint
│   ├── models/
│   │   └── PortfolioModels.js  # Mongoose Schemas
│   ├── routes/
│   │   ├── contactRoutes.js    # POST /api/contact, GET /download-excel
│   │   └── portfolioRoutes.js  # GET /api/portfolio
│   ├── utils/
│   │   ├── excelHandler.js     # xlsx append logic
│   │   └── seedData.js         # Initial data
│   └── server.js               # Express application entrypoint
├── api/
│   └── index.js                # Vercel Serverless Function entrypoint
├── portfolio_contacts.xlsx     # Live Excel file of contact submissions
├── vercel.json                 # Vercel build & routing configuration
├── .env.example                # Environment variables template
└── package.json                # Root scripts
```

---

## ⚡ Running Locally

### 1. Install Dependencies
```bash
# In the root folder:
npm --prefix server install
npm --prefix client install
```

### 2. Configure Environment Variables (Optional)
Copy `.env.example` to `.env` in the root folder:
```bash
cp .env.example .env
```
Fill in your MySQL and MongoDB credentials if available. If left empty, the application automatically runs in safe fallback mode.

### 3. Run Backend API Server
```bash
npm run server
```
Server runs at `http://localhost:5000`.

### 4. Run Frontend Client
```bash
npm run dev
```
Client runs at `http://localhost:5173`.

---

## 🌐 Deploying to Vercel

1. Push your repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Select your repository.
4. Framework Preset: **Vite**
5. Root Directory: `./` (or leave default)
6. Build Command: `npm run build`
7. Output Directory: `client/dist`
8. In **Environment Variables**, add:
   - `MYSQL_HOST`
   - `MYSQL_USER`
   - `MYSQL_PASSWORD`
   - `MYSQL_DATABASE`
   - `MYSQL_PORT`
   - `MONGODB_URI`
9. Click **Deploy**!

Vercel will serve the static React frontend from `client/dist` and automatically route all `/api/*` calls to the serverless function in `api/index.js`.

---

## 📊 Automated Excel Export (`portfolio_contacts.xlsx`)

Every time a visitor submits the contact form:
1. Contact details are validated.
2. Inserted into the MySQL table `portfolio_contacts`.
3. Appended to `portfolio_contacts.xlsx` with:
   - **Name**
   - **Email**
   - **Message**
   - **Date**
   - **Time**
4. The spreadsheet can be downloaded anytime via:
   ```
   GET /api/contact/download-excel
   ```
   or by clicking the **"Export All Inquiries to Excel (.xlsx)"** button directly in the Contact section!

---

## 👤 Author

**S.Thirukumaran**
- Email: [thirus1712@gmail.com](mailto:thirus1712@gmail.com)
- Phone: [+91 8838010780](tel:8838010780)
- GitHub: [github.com/thirus1712](https://github.com/thirus1712)
- College: BE-CSE, SRM Easwari Engineering College, Chennai
