# MatchM8 - MVP UI

A matchmaking platform for finding study partners, game teammates, or companions for events.

## 🎨 Design System

- **Primary Color**: `#5B6CFF` (Purple-blue)
- **Accent Color**: `#FF7A59` (Coral-orange)
- **Base Spacing**: 16px
- **Border Radius**: 12px
- **Typography**: DM Sans (body), Space Grotesk (headings)
- **Layout**: 12-column grid, 1440px max width

## 📱 Screens

1. **Onboarding** - Multi-step welcome flow with interest selection
2. **Main Feed** - Discovery interface with match recommendations
3. **Person Profile** - Detailed view of potential matches
4. **Event Detail** - Event information with attendee list
5. **Chat/Scheduler** - Messaging with integrated scheduling

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Navigate to project
cd matchm8

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

### Demo Mode

Visit `/demo` to see the complete user flow:
1. **Discover** → Browse potential matches
2. **Profile** → View detailed match info
3. **Invite** → Send connection request
4. **Schedule** → Chat and set up meetup

## 📁 Project Structure

```
matchm8/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ui/           # Reusable UI components
│   │   │   ├── Avatar.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Input.jsx
│   │   │   └── index.js
│   │   └── layout/       # Layout components
│   │       ├── Header.jsx
│   │       └── index.js
│   ├── data/
│   │   └── mockData.js   # Placeholder data
│   ├── screens/
│   │   ├── Onboarding.jsx
│   │   ├── MainFeed.jsx
│   │   ├── PersonProfile.jsx
│   │   ├── EventDetail.jsx
│   │   ├── ChatScheduler.jsx
│   │   ├── DemoFlow.jsx
│   │   └── index.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🎯 Features

### Accessibility
- Semantic HTML5 elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus management
- Screen reader friendly

### Responsive Design
- Desktop-first approach (1440px)
- Tablet breakpoint (768px)
- Mobile breakpoint (640px)

### Component Library
- **Button**: Primary, secondary, accent, outline, ghost variants
- **Card**: Flexible container with hover states
- **Avatar**: With verification badge and online status
- **Badge**: Color-coded status indicators
- **Input**: Form inputs with validation states

## 🛠 Tech Stack

- **React 18** - UI framework
- **React Router 6** - Client-side routing
- **Tailwind CSS 3** - Utility-first styling
- **Lucide React** - Icon library
- **Vite** - Build tool

## 📋 Available Routes

| Route | Screen | Description |
|-------|--------|-------------|
| `/demo` | Demo Flow | Interactive walkthrough |
| `/onboarding` | Onboarding | New user setup |
| `/feed` | Main Feed | Discovery page |
| `/profile/:id` | Person Profile | Match details |
| `/event/:id` | Event Detail | Event page |
| `/chat/:id` | Chat/Scheduler | Messaging |

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to customize the color palette:

```js
colors: {
  primary: {
    DEFAULT: '#5B6CFF',
    // ... shades
  },
  accent: {
    DEFAULT: '#FF7A59',
    // ... shades
  }
}
```

### Typography

The app uses Google Fonts. Edit `index.html` to change fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
```

## 📄 License

MIT License - feel free to use for your projects!


