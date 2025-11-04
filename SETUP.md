# Setup Instructions

## Environment Variables

Copy the `.env.example` file to `.env.local` in the root directory:

```bash
cp .env.example .env.local
```

### Important: Google Maps API Key

The Google Maps API key needs the `NEXT_PUBLIC_` prefix to be accessible in the browser. Update your `.env.local` file to include:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyAjXVS6Wgkwsa6gO9dL3-X57ca4PQOdVy4
```

This prefix is required for Next.js to expose the variable to client-side components.

### Complete `.env.local` File

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyAjXVS6Wgkwsa6gO9dL3-X57ca4PQOdVy4
TWILIO_ACCOUNT_SID=AC1228839359a91a63c88a2d10f83a53e9
TWILIO_AUTH_TOKEN=d3457b13da924b8c4e481da3244f2bce
STRIPE_SECRET_KEY=sk_test_51SHkQ4GfN7yihstOo4Nt0yppimynpv0upvNgpjlPW4k0YiNfxZNRpuLf7SfD095cuPzZRvrgI58o1TVpzenq4ehH00UpCAulml
STRIPE_PUBLISHABLE_KEY=pk_test_51SHkQ4GfN7yihstOarEYY8K2HtfYGCfqDbvQyoGXVNILEdY8RVwMmeCUOtCSJr2JHpcCiVAb7Ht7ROWWjpdWzB5O00JS7w5gGU
```

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Features to Test

### Home Page (/)
- Navigate to the home page to see the weather forecast and map
- Hover over weather cards to see animations
- Zoom and pan the Google Map

### Admin Page (/admin)
- **Payment Links:** Enter an amount and phone number to test Stripe integration
- **Call Customer:** Click "Call Now" to test Twilio voice calls
- **NPS Survey:** Enter a phone number to test SMS sending

## Troubleshooting

### Google Maps Not Loading
- Ensure `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is set in `.env.local`
- Restart the dev server after adding environment variables

### Stripe/Twilio Errors
- Check that your API keys are correctly set in `.env.local`
- Verify the Twilio phone number is configured in your Twilio account

### Build Errors
- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`



