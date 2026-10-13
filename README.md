# Subash Mahendran — Cinematic 3D Portfolio & Profile

A high-performance, immersive portfolio and technical profile for **Subash Mahendran** (**AI/ML Engineer & Python Developer**), built with React, Vite, Tailwind CSS v4, GSAP ScrollTrigger, Three.js, React Three Fiber, and Lucide React.

---

## ⚡ Core Technical Profile

- **Name**: Subash Mahendran
- **Primary Roles**: AI/ML Engineer & Python Developer
- **Technical Focus**: Applied Machine Learning, Deep Learning, Computer Vision (YOLOv8), Data Analytics, Full-Stack Applications
- **Education**: B.Tech in Artificial Intelligence and Data Science (Completed 2026)
- **Location**: Chennai, India
- **LinkedIn**: [linkedin.com/in/subash-mahendran](https://www.linkedin.com/in/subash-mahendran)
- **GitHub**: [github.com/Subash403](https://github.com/Subash403)
- **Email**: [subashrcm61@gmail.com](mailto:subashrcm61@gmail.com)

---

## 📁 Project Architecture & Components

```text
subash-cinematic-portfolio/
├── public/
│   ├── resume.pdf                # Official PDF résumé
│   └── README.txt                # Asset placement documentation
├── src/
│   ├── components/
│   │   ├── AboutSection.jsx      # B.Tech status, 4 engineering pillars, narrative & stats
│   │   ├── AchievementsSection.jsx# 7 honors & awards (with 1st place gold badges), 3 symposium papers
│   │   ├── AnimatedBackground.jsx# Persistent drifting particles, light fields, perspective grid
│   │   ├── CertificationGallery.jsx# Unified Certifications grid with 3D tilt & brand badges
│   │   ├── CertificationLogos.jsx# Authentic vector provider logos (Oracle, HackerRank, HP, etc.)
│   │   ├── ContactSection.jsx    # Dual ambient orbs, rotating orbital rings, direct channels
│   │   ├── ExperienceTimeline.jsx# Scroll-driven vertical timeline with glowing spine & nodes
│   │   ├── Footer.jsx            # Social channels, site navigation, copyright
│   │   ├── HeroScene.jsx         # Procedural 3D R3F core with pointer tilt & WebGL fallback
│   │   ├── HeroSection.jsx       # Headline, official roles, metrics bar, CTAs
│   │   ├── Navbar.jsx            # Sticky navigation with mobile drawer & resume link
│   │   ├── Preloader.jsx         # Monogram sequence with instant skip button [ESC]
│   │   ├── ProjectCard.jsx       # 3D perspective tilt, spotlight glow, orbital visual chamber
│   │   ├── ProjectGallery.jsx    # Category filtering for client software, ML & vision pipelines
│   │   ├── Reveal.jsx            # GSAP ScrollTrigger animation wrapper
│   │   ├── ScrollProgress.jsx    # Razor-thin top reading progress indicator
│   │   ├── SectionDivider.jsx    # Luminous section dividers with system coordinate tags
│   │   └── SectionHeading.jsx    # Numbered section headers with status dot
│   ├── data/
│   │   ├── achievements.js       # Contest awards and paper presentations
│   │   ├── certifications.js     # Unified certifications & professional learning list
│   │   ├── experience.js         # Freelance delivery & internships
│   │   ├── projects.js           # SHEE'S SPA (live), AMR Insight, YOLOv8 Detection, MediSync
│   │   └── skills.js             # 6 grouped technical categories (no arbitrary percentages)
│   ├── App.jsx                   # Central page assembly & GSAP transitions
│   ├── main.jsx                  # React DOM mount point
│   └── styles.css                # Obsidian black, electric violet & ice-blue styling
├── index.html                    # SEO meta tags, Open Graph, Google Fonts
├── vite.config.js                # Optimized rollup chunk splitting (three, r3f, vendor)
└── package.json                  # Dependencies & scripts
```

---

## 🚀 Running the Project Locally

```bash
# Install dependencies
npm install

# Start the Vite development server
npm run dev

# Build the production bundle
npm run build

# Preview the production build locally
npm run preview
```

---

## ☁️ Deployment Instructions for Vercel

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "feat: cinematic backgrounds, vertical timeline and provider logos"
   git push origin main
   ```
2. **Import to Vercel**:
   - Log into [Vercel](https://vercel.com/) and click **Add New... -> Project**.
   - Select your `subash-cinematic-portfolio` repository.
   - Framework Preset: **Vite**.
   - Root Directory: `./`.
   - Build Command: `npm run build`.
   - Output Directory: `dist`.
3. **Deploy**:
   - Click **Deploy** for automated production deployment.
