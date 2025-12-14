# OxcyShop - File Host

A modern, private file hosting platform with a sleek dark theme (black and orange).

## Features

- 🔐 Token-based authentication
- 📤 File upload with drag-and-drop support
- 📥 Direct file download
- 🗑️ File deletion
- 📱 Responsive design
- 🎨 Dark theme with orange accents (#FFA500)

## Setup

### Prerequisites

- Node.js 18+ installed
- Python FastAPI backend running (with endpoints: /upload, /my_files, /download/{file_id}, /delete)

### Installation

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Configure your backend URL:
Create a `.env.local` file:
\`\`\`env
NEXT_PUBLIC_API_URL=http://your-backend-url:8000
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Backend Integration

This frontend connects to a Python FastAPI backend with the following endpoints:

- `POST /create_token` - Create invitation token
- `POST /upload` - Upload files (FormData with 'file' and 'token')
- `POST /my_files` - List user files (JSON with 'token')
- `GET /download/{file_id}` - Download file
- `POST /delete` - Delete file (JSON with 'token' and 'file_id')

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Deploy to VPS

1. Build the project:
\`\`\`bash
npm run build
\`\`\`

2. Start the production server:
\`\`\`bash
npm start
\`\`\`

3. Configure nginx or your preferred reverse proxy to serve the app

## File Type Validation

Currently supports: `.exe`, `.txt`, `.lua`, `.py`, `.js`, `.json`, `.md`, `.zip`, `.rar`, `.pdf`, `.doc`, `.docx`

You can modify allowed file types in `components/upload-dialog.tsx`.

## Theme Customization

The theme uses:
- Background: Black (#000000)
- Primary: Orange (#FFA500)
- Clean, modern typography with Geist font

Customize colors in `app/globals.css`.
