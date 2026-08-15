# Analytics Society of India (ASI) — Digital Inauguration Experience

A ultra-premium, interactive web application built for the official inauguration ceremony of the **Analytics Society of India (ASI) Student Chapter** at **Sri Shakthi Institute of Engineering and Technology** by **Chief Guest Dr. Dinesh Kumar**.

Designed specifically for 16:9 large touch-screen Smart Boards.

---

## 🚀 How to Run Locally

### 1. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your web browser (Google Chrome or Microsoft Edge recommended for Smart Boards).

### 2. Launch Fullscreen on Smart Board
- Click the **Fullscreen Icon** (top right of the header bar) OR press **F11** on the keyboard.
- The interface automatically locks scrolling and scales perfectly to 16:9 displays (1920 × 1080).

---

## 📜 4-Stage Ceremony Workflow (Total Time: ~30–40 Seconds)

1. **STAGE 1 — READY / DASHBOARD SCREEN**
   - Displays command analytics dashboard with particle node background.
   - Text: `ANALYTICS SOCIETY OF INDIA` • `STUDENT CHAPTER` • `SRI SHAKTHI INSTITUTE OF ENGINEERING AND TECHNOLOGY`
   - Central Heading: `A NEW CHAPTER IN ANALYTICS BEGINS`
   - CTA Button: **`[ INITIATE INAUGURATION ]`**

2. **STAGE 2 — CHIEF GUEST CONFIRMATION**
   - Formal welcome for Chief Guest **Dr. Dinesh Kumar**.
   - Large glowing golden CTA button: **`[ INAUGURATE NOW ]`** with touch ripple feedback.

3. **STAGE 3 — 3-2-1 COUNTDOWN**
   - 2.5–3 second ceremonial countdown with ascending acoustic audio chimes and particle ring convergence.

4. **STAGE 4 — OFFICIAL INAUGURATION REVEAL**
   - Formal institutional plaque reveal:
     - `ANALYTICS SOCIETY OF INDIA`
     - `STUDENT CHAPTER`
     - `OFFICIALLY INAUGURATED by DR. DINESH KUMAR`
     - `SRI SHAKTHI INSTITUTE OF ENGINEERING AND TECHNOLOGY`
     - `24 AUGUST 2026`
     - `THE JOURNEY BEGINS.`

---

## 🗺️ Pre-Event Mode: Explore ASI

Before the official inauguration begins (e.g. while participants are entering the hall and taking their seats), organizers can run the **Explore ASI Mode** by clicking the **`[ EXPLORE ASI ]`** button on the Stage 1 home screen.

### Features:
- **Cinematic Presentation Display**: A continuous 9-scene slideshow presenting:
  1. Welcome Title Card
  2. Analytics Society of India (ASI) Introduction
  3. Vision & Objectives (Data ➔ Knowledge ➔ Insight ➔ Impact)
  4. Academic Foundation & Affiliation (IIM Bangalore)
  5. Mentoring Lab (DCAL Lab)
  6. Student Chapter Details & Local Initiative
  7. Benefits & Activities (Seminars, Hackathons, Projects, etc.)
  8. Inauguration Information
  9. Infinite Loop Transition
- **Static branding header**: The institutional header stays pinned to the top of the display to maintain official branding context throughout the pre-event.
- **Presenter & Audio Controls**: Integrated sound controls (mute/unmute) and a quick Exit button. Pressing `Esc` at any point returns the presenter back to the Stage 1 ceremony dashboard.

---

## 🔒 Organizer Controls & Reset Mechanism

To reset the inauguration back to **Stage 1 (Dashboard)** between rehearsals or runs:
- **Keyboard Shortcut**: Press `Ctrl + Shift + R`
- **Secret Touch Gesture**: Tap 3 times on the **top-left invisible corner area** of the screen.
- **Header Icon**: Click the subtle refresh button at the far right of the top bar.

---

## 🎨 How to Customize Logos & Audio

All event details and asset paths are centralized in **`src/config/eventConfig.ts`**:

```typescript
export const EVENT_CONFIG = {
  organization: 'ANALYTICS SOCIETY OF INDIA',
  subTitle: 'STUDENT CHAPTER',
  institution: 'SRI SHAKTHI INSTITUTE OF ENGINEERING AND TECHNOLOGY',
  chiefGuest: {
    title: 'WELCOME, CHIEF GUEST',
    name: 'Dr. Dinesh Kumar',
    designation: 'Chief Guest & Keynote Dignitary',
  },
  eventDate: '24 AUGUST 2026',
  logos: {
    asiLogoPath: '/assets/asi-logo.svg', // Replace with your logo file in public/assets/
    collegeLogoPath: '/assets/college-logo.svg',
  },
};
```

To use custom high-res PNG/SVG logos:
1. Place your PNG/SVG logo files inside `public/assets/` (e.g. `public/assets/asi-official-logo.png`).
2. Update `asiLogoPath` or `collegeLogoPath` in `src/config/eventConfig.ts`.
