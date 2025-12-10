# Mohammed Azhan Portfolio

Modern frontend portfolio showcasing projects, journey timeline, testimonials, and a contact form with a Node.js email backend.

## Tech Stack
- Frontend: HTML, Tailwind CSS (CDN), Vanilla JS, Feather Icons, Font Awesome
- Backend: Node.js, Express, Nodemailer (Gmail App Password)
- Styling: Gradients + light/dark theme toggle via custom Web Component (`navbar.js`)

## Features
- Responsive hero, projects, journey timeline, testimonials, contact form
- Theme toggle (dark / light) with consistent styling
- Animated timeline entries and project hover effects
- Contact form validation + email delivery
- Back to top button + smooth scrolling

## Project Structure
```
components/          # Web components (navbar, footer) and images
index.html           # Main static page
style.css            # Custom styles + light mode overrides
script.js            # Frontend interactions (scroll, form submit)
server.js            # Express email handler
.env.example         # Sample environment variables
package.json         # Dependencies & scripts
```

## Getting Started
```bash
npm install
cp .env.example .env   # Fill in EMAIL_USER and EMAIL_PASS (Gmail App Password)
npm start              # Runs server at http://localhost:3000
# Open index.html in browser (or serve statically via any web server)
```

## Environment Variables
| Variable     | Description                    |
|--------------|--------------------------------|
| EMAIL_USER   | Your Gmail address             |
| EMAIL_PASS   | Gmail App Password             |
| PORT         | Server port (default 3000)     |

Generate Gmail App Password: Enable 2FA > App Passwords > Create for "Mail".

## Contact Form Endpoint
POST `/send-email`
Body:
```json
{
  "name": "Your Name",
  "email": "you@example.com",
  "message": "Hello there"
}
```
Response:
```json
{ "success": true, "message": "Message sent successfully!" }
```

## Production Notes
- Change fetch URL in `script.js` to relative (`/send-email`) – already done.
- Keep `.env` out of version control (`.gitignore` already includes it).
- For custom domain + reverse proxy, expose only static assets and API.

## Maintenance Tips
- Avoid committing real credentials.
- Replace placeholder LinkedIn URL when available.
- Optimize images under `components/images` if performance needed.

## License
MIT
