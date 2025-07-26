# 🎨 Frontend Architecture - Lovable React App

## 📋 Component Architecture

### **Core Structure**
```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI elements (buttons, cards, etc.)
│   ├── layout/          # Layout components (header, sidebar, etc.)
│   ├── auth/            # Authentication components
│   ├── gamification/    # Points, badges, rankings
│   ├── brand/           # Brand-specific components
│   └── forms/           # Form components
├── pages/               # Page components
│   ├── Home.tsx
│   ├── auth/
│   ├── user/            # User dashboard pages
│   └── brand/           # Brand dashboard pages
├── hooks/               # Custom React hooks
├── lib/                 # Utilities and configurations
│   ├── supabase.ts      # Supabase client
│   ├── auth.ts          # Auth utilities
│   └── api.ts           # API calls
├── types/               # TypeScript types
├── store/               # State management
└── styles/              # Global styles
```

## 🎯 Key Features to Implement

### **Dual User Experience**
1. **User Journey** (Fans/Participants)
   - Gamified onboarding
   - Points tracking dashboard
   - Brand interaction history
   - Leaderboards and rankings
   - Rewards marketplace
   - Profile and referrals

2. **Brand Journey** (Companies/Influencers)
   - Professional onboarding
   - Analytics dashboard
   - Community management
   - Campaign creation
   - User insights and micro-influencer discovery
   - Reward management

## 🎨 Design System

### **Visual Identity**
- **Theme**: Apple-inspired clean design
- **Mode**: Light/Dark toggle
- **Colors**: Modern gradient palette
- **Typography**: Clean, readable fonts
- **Animations**: Smooth, purposeful transitions

### **Gamification Elements**
- Progress bars and level indicators
- Badge collections
- Point counters with animations
- Leaderboard tables
- Achievement notifications
- Streak indicators

## 🔧 Tech Stack
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State**: React Query + Zustand
- **Auth**: Supabase Auth
- **Icons**: Lucide React
- **Charts**: Recharts
- **Animations**: Framer Motion