# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Create Environment File

Create a `.env.local` file in the root directory with these contents:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyAjXVS6Wgkwsa6gO9dL3-X57ca4PQOdVy4
TWILIO_ACCOUNT_SID=AC1228839359a91a63c88a2d10f83a53e9
TWILIO_AUTH_TOKEN=d3457b13da924b8c4e481da3244f2bce
STRIPE_SECRET_KEY=sk_test_51SHkQ4GfN7yihstOo4Nt0yppimynpv0upvNgpjlPW4k0YiNfxZNRpuLf7SfD095cuPzZRvrgI58o1TVpzenq4ehH00UpCAulml
STRIPE_PUBLISHABLE_KEY=pk_test_51SHkQ4GfN7yihstOarEYY8K2HtfYGCfqDbvQyoGXVNILEdY8RVwMmeCUOtCSJr2JHpcCiVAb7Ht7ROWWjpdWzB5O00JS7w5gGU
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Run Development Server

```bash
npm run dev
```

Visit **http://localhost:3000** to see the app! 🎉

---

## 📱 Test the Features

### Home Page (/)
- View the 7-day weather forecast
- Explore the Google Map of Seattle
- Navigate using the floating glass navbar

### Admin Page (/admin)
- **Send Payment Link:** Test Stripe integration
- **Call Customer:** Test Twilio voice calls
- **Send NPS Survey:** Test Twilio SMS

---

## ⚠️ Important Notes

1. **Google Maps:** Requires the `NEXT_PUBLIC_` prefix in `.env.local`
2. **Twilio:** You need to configure a phone number in your Twilio account to send SMS and make calls
3. **Stripe:** Using test keys - payments won't be charged for real

For detailed setup instructions, see [SETUP.md](./SETUP.md)

For full documentation, see [README.md](./README.md)



