# Job Tracker PWA

A modern, sleek Job Application Tracking System built with Next.js, optimized for iOS as a Progressive Web App.

## Features

✨ **Modern UI/UX** - Inspired by Linear and Raycast
📱 **Mobile-First** - Fully responsive with PWA support for iOS
🌓 **Dark/Light Mode** - Automatic theme switching
💾 **Local Storage** - Data persists without a database
🎨 **Status Management** - Color-coded statuses and stages
🔗 **Share Links** - Copy shareable links for each application
⚡ **Smooth Animations** - Powered by Framer Motion

## Tech Stack

- **Framework**: Next.js (Pages Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **PWA**: next-pwa

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
npm run build
npm start
```

## Installing as PWA on iOS

1. Open the app in Safari on your iPhone
2. Tap the Share button (bottom middle)
3. Scroll down and tap "Add to Home Screen"
4. Name it "Job Tracker" and tap "Add"
5. The app will now appear on your home screen like a native app!

## Generate PWA Icons

1. Open `public/generate-icons.html` in a browser
2. It will automatically generate and download `icon-192.png` and `icon-512.png`
3. Save both files in the `public/` directory

Alternatively, create your own 192x192 and 512x512 PNG icons.

## Project Structure

```
job-tracking/
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── sw.js                  # Service worker
│   ├── generate-icons.html    # Icon generator
│   └── icon-*.png            # App icons (you need to generate these)
├── src/
│   ├── components/
│   │   ├── Layout.tsx        # Main layout with nav and theme toggle
│   │   ├── JobTable.tsx      # Desktop table view
│   │   ├── JobCard.tsx       # Mobile card view
│   │   ├── StatusBadge.tsx   # Status/stage badges
│   │   └── AddJobModal.tsx   # Add job form modal
│   ├── hooks/
│   │   └── useJobs.ts        # Custom hook for job management
│   ├── pages/
│   │   ├── _app.tsx          # App wrapper with PWA setup
│   │   ├── _document.tsx     # Document with PWA meta tags
│   │   └── index.tsx         # Main dashboard page
│   ├── styles/
│   │   └── globals.css       # Global styles and Tailwind
│   ├── types/
│   │   └── job.ts            # TypeScript types
│   └── utils/
│       └── storage.ts        # localStorage utilities
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── postcss.config.js
```

## Usage

### Adding a Job Application

1. Click the "+ Add Job" button
2. Fill in the form:
   - Company name
   - Position
   - Job URL
   - Applied date
   - Status (Pending, Applied, Interview, Accepted, Rejected)
   - Stage (Resume, Phone, Technical, On-site, Offer, Rejected)
   - Optional notes
3. Click "Add Application"

### Managing Applications

- **View**: Automatically switches between table (desktop) and cards (mobile)
- **Open Job**: Click the external link icon to visit the job posting
- **Share**: Click the share icon to copy a shareable link
- **Delete**: Click the trash icon to remove an application
- **Theme**: Toggle between light and dark mode with the sun/moon icon

## Customization

### Colors

Edit the CSS variables in `src/styles/globals.css` to customize the color scheme.

### Status/Stage Options

Modify `src/types/job.ts` to add or change status and stage options.

### Storage

The app uses localStorage. To add backend support, modify `src/utils/storage.ts` and `src/hooks/useJobs.ts`.

## Browser Support

- Chrome/Edge: ✅ Full support
- Safari (iOS): ✅ Full PWA support
- Firefox: ✅ Full support (PWA limited)

## License

MIT

## Contributing

Feel free to submit issues and pull requests!
