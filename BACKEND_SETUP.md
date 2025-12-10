# Contact Form Backend Setup

## Setup Instructions

### 1. Install Dependencies
Run this command in the portfolio folder:
```bash
npm install
```

### 2. Configure Email Settings

Create a `.env` file in the root directory (copy from `.env.example`):
```bash
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
PORT=3000
```

### 3. Get Gmail App Password

**Important:** You need to use an App Password, not your regular Gmail password.

Steps to get Gmail App Password:
1. Go to your Google Account: https://myaccount.google.com/
2. Click on "Security" in the left sidebar
3. Enable "2-Step Verification" if not already enabled
4. Go back to Security and click "App passwords"
5. Select "Mail" and "Other (Custom name)"
6. Name it "Portfolio Contact Form"
7. Copy the 16-character password
8. Paste it in your `.env` file as `EMAIL_PASS`

### 4. Start the Server

Run the backend server:
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:3000`

### 5. Open Your Portfolio

Open `index.html` in your browser. The contact form will now send emails!

## Features

✅ Email validation
✅ Form validation
✅ Success/error messages
✅ Loading state on submit button
✅ Automatic email sending via Gmail
✅ Beautiful response messages

## Testing

1. Fill out the contact form
2. Click "Send Message"
3. Check your Gmail inbox for the message
4. You should see a success message on the form

## Troubleshooting

**Problem:** "Network error" message
- Make sure the server is running (`npm start`)
- Check that port 3000 is not in use

**Problem:** Email not sending
- Verify your Gmail credentials in `.env`
- Make sure you're using an App Password, not regular password
- Check that 2-Step Verification is enabled on your Google account

**Problem:** CORS errors
- The server has CORS enabled, but make sure you're accessing via the same domain
