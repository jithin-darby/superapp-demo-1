# Step-by-Step Local Setup Instructions
## EverGreen Works - Operations Dashboard Demo

This guide provides detailed instructions for running the application locally for demonstration purposes.

---

## Prerequisites Checklist

Before starting, ensure you have the following installed on your system:

- ✅ **Node.js** (Version 18 or higher)
  - Download from: https://nodejs.org/
  - Verify installation: Open terminal/command prompt and run `node --version`
  - Should display: `v18.x.x` or higher

- ✅ **npm** (Node Package Manager - comes with Node.js)
  - Verify installation: Run `npm --version`
  - Should display: `9.x.x` or higher

- ✅ **Git** (optional, if cloning from repository)
  - Verify installation: Run `git --version`

---

## Step-by-Step Setup Instructions

### Step 1: Navigate to Project Directory

1. Open **Command Prompt** (Windows) or **Terminal** (Mac/Linux)
2. Navigate to the project folder:
   ```bash
   cd "C:\Users\jithi\OneDrive\Desktop\WORK\Fleet Management System\Research\Third Party Integrations\Testing\tw_st_noaa\superapp-demo-1"
   ```
   *(Adjust the path if your project is located elsewhere)*

### Step 2: Create Environment Configuration File

1. Create a new file named `.env.local` in the project root directory
2. You can do this by:
   - **Option A:** Using a text editor (Notepad, VS Code, etc.)
   - **Option B:** Using command line: `notepad .env.local` (Windows) or `nano .env.local` (Mac/Linux)

3. Copy and paste the following content into the `.env.local` file:

   ```env
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<enter a value here>
   TWILIO_ACCOUNT_SID=<enter a value here>
   TWILIO_AUTH_TOKEN=<enter a value here>
   STRIPE_SECRET_KEY=<enter a value here>
   STRIPE_PUBLISHABLE_KEY=<enter a value here>
   ```

4. **Important:** Save the file with the exact name `.env.local` (including the dot at the beginning)

### Step 3: Install Project Dependencies

1. In the same terminal/command prompt window, ensure you're in the project directory
2. Run the following command:
   ```bash
   npm install
   ```
3. This will download and install all required packages
4. **Wait for completion** - This may take 2-5 minutes depending on your internet connection
5. You should see a message like: `added XXX packages` when complete

### Step 4: Start the Development Server

1. Once dependencies are installed, run:
   ```bash
   npm run dev
   ```
2. You should see output similar to:
   ```
   ▲ Next.js 15.0.0
   - Local:        http://localhost:3000
   - Ready in 2.3s
   ```
3. **Keep this terminal window open** - The server must remain running for the application to work

### Step 5: Access the Application

1. Open your web browser (Chrome, Firefox, Edge, etc.)
2. Navigate to: **http://localhost:3000**
3. You should see the EverGreen Works dashboard with:
   - Weather forecast cards
   - Interactive Google Map
   - Navigation menu

---

## Demo Features to Showcase

### Home Page (Main Dashboard)
- **Weather Forecast**: Display 7-day NOAA weather forecast for Seattle
- **Interactive Map**: Google Maps integration showing Seattle operations area
- **Modern UI**: Glassmorphism design with smooth animations

### Admin Page (/admin)
Access by navigating to: **http://localhost:3000/admin**

1. **Payment Links (Stripe Integration)**
   - Enter an amount (e.g., $150.00)
   - Enter a phone number (e.g., +1234567890)
   - Click "Generate Payment Link"
   - System will create a Stripe payment link and send it via SMS

2. **Voice Calls (Twilio Integration)**
   - Click "Call Now" button
   - Initiates a call to the configured customer number
   - Demonstrates real-time communication capabilities

3. **NPS Surveys (Twilio SMS)**
   - Enter a phone number
   - Click "Send NPS Survey"
   - Sends customer satisfaction survey via SMS

---

## Troubleshooting Guide

### Issue: "node: command not found" or "npm: command not found"
**Solution:** 
- Node.js is not installed or not in your system PATH
- Install Node.js from https://nodejs.org/
- Restart your terminal after installation

### Issue: "Cannot find module" errors during `npm install`
**Solution:**
- Delete the `node_modules` folder and `package-lock.json` file
- Run `npm install` again
- Ensure you have a stable internet connection

### Issue: Port 3000 is already in use
**Solution:**
- Close other applications using port 3000
- Or run on a different port: `npm run dev -- -p 3001`
- Then access at: http://localhost:3001

### Issue: Google Maps not loading
**Solution:**
- Verify `.env.local` file exists and contains `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- Ensure the file is named exactly `.env.local` (not `.env.local.txt`)
- Restart the development server after creating/modifying `.env.local`

### Issue: Stripe/Twilio errors when testing features
**Solution:**
- Verify all environment variables are correctly set in `.env.local`
- Check that there are no extra spaces or quotes around the values
- Ensure the Twilio phone number is configured in your Twilio account

### Issue: Application won't start
**Solution:**
- Clear Next.js cache: Delete the `.next` folder
- Reinstall dependencies: `npm install`
- Restart the development server: `npm run dev`

---

## Quick Reference Commands

| Action | Command |
|--------|---------|
| Install dependencies | `npm install` |
| Start development server | `npm run dev` |
| Build for production | `npm run build` |
| Start production server | `npm start` |
| Run linter | `npm run lint` |

---

## System Requirements

- **Operating System**: Windows 10+, macOS 10.15+, or Linux
- **RAM**: Minimum 4GB (8GB recommended)
- **Disk Space**: ~500MB for dependencies
- **Internet Connection**: Required for initial setup and API calls

---

## Security Notes for Demo

⚠️ **Important:** The API keys and credentials in this setup are **test/development keys**:
- Stripe keys are test mode (no real charges)
- Twilio account is configured for testing
- Google Maps API key is provided for demo purposes

For production deployment, these should be replaced with production credentials and stored securely.

---

## Support

If you encounter any issues not covered in this guide:
1. Check that all prerequisites are installed correctly
2. Verify the `.env.local` file is properly configured
3. Ensure the development server is running
4. Check the terminal/command prompt for error messages

---

## Next Steps After Setup

Once the application is running:
1. ✅ Verify the home page loads correctly
2. ✅ Test navigation to the admin page
3. ✅ Review the weather forecast display
4. ✅ Test the interactive map features
5. ✅ Prepare demo scenarios for each admin feature

---

**Document Version:** 1.0  
**Last Updated:** Current Date  
**Project:** EverGreen Works Operations Dashboard


