# EverGreen Works - Operations Dashboard

A modern, glassmorphism-designed Next.js 15 web application for a lawn mowing & construction company, featuring NOAA weather forecasts, Google Maps integration, and admin tools powered by Stripe and Twilio.

## 🌿 Features

### Home Page (/)
- **NOAA 7-Day Weather Forecast** - Seattle weather forecast displayed in beautiful glass cards
- **Google Maps Integration** - Interactive map centered on Seattle operations
- **Glassmorphism UI** - Premium design with blur effects, soft shadows, and green/gray color palette
- **Framer Motion Animations** - Smooth transitions and hover effects

### Admin Page (/admin)
- **Stripe Payment Links** - Generate and send payment links via SMS
- **Twilio Voice Calls** - Initiate calls directly from the dashboard
- **NPS SMS Surveys** - Send customer satisfaction surveys via SMS

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd superapp-demo-1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
superapp-demo-1/
├── app/
│   ├── api/
│   │   ├── stripe/
│   │   │   └── create-payment-link/
│   │   │       └── route.ts
│   │   └── twilio/
│   │       ├── call/
│   │       │   └── route.ts
│   │       └── sms/
│   │           └── route.ts
│   ├── admin/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Navbar.tsx
│   ├── WeatherCard.tsx
│   ├── MapView.tsx
│   ├── PaymentPanel.tsx
│   ├── CallPanel.tsx
│   └── SmsPanel.tsx
├── components.json
├── next.config.js
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🎨 Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
- **Payments:** Stripe
- **Communications:** Twilio
- **Maps:** Google Maps API

## 🔧 Configuration

### Google Maps API
- Uses the provided API key: `AIzaSyAjXVS6Wgkwsa6gO9dL3-X57ca4PQOdVy4`
- For production, replace with your own API key

### Stripe
- Test keys configured for payment link generation
- Payment links are sent via Twilio SMS

### Twilio
- Account SID and Auth Token configured for:
  - SMS messaging (payment links and NPS surveys)
  - Voice calls to customers

## 🎯 Usage

### Home Page
- View 7-day weather forecast for Seattle
- Explore the interactive Google Map
- Navigate between pages using the floating navbar

### Admin Page
- **Send Payment Link:** Enter amount and mobile number to generate and send a Stripe payment link
- **Call Customer:** Click "Call Now" to initiate a call to +91 8943657704
- **Send NPS Survey:** Enter mobile number to send an NPS survey via SMS

## 🎨 Design Features

### Glassmorphism
- Transparent panels with backdrop blur
- Soft shadows and borders
- Green and gray color palette
- Premium, modern aesthetic

### Animations
- Smooth page transitions
- Hover effects on interactive elements
- Loading skeletons
- Micro-interactions

### Responsive Design
- Mobile-friendly layout
- Adaptive grid systems
- Touch-optimized interactions

## 📦 Build

```bash
npm run build
npm start
```

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 🙏 Acknowledgments

- Design inspiration from Apple Maps and modern dashboard UI
- Built with Next.js 15 and Tailwind CSS v4
- Glassmorphism patterns inspired by modern web design trends
