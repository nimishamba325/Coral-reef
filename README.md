# CoralGuard - Coral Reef Health Monitoring System

A React + Tailwind CSS frontend application for monitoring coral reef health using AI-powered analysis.

## Features

- 🌊 **Ocean-themed Design**: Beautiful blue gradient theme with smooth transitions
- 📸 **Image Upload**: Drag & drop or click to upload coral reef images
- 🤖 **AI Analysis**: Mock API that simulates coral health prediction
- 📊 **Health Assessment**: Color-coded results (Green = Healthy 🌿, Red = Bleached ⚠️)
- ⚡ **Loading Animation**: 2-second loading spinner during analysis
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Rounded cards, smooth transitions, and beautiful gradients

## Pages

- **Home**: Landing page with features and call-to-action
- **Predict**: Image upload and analysis workflow
- **About**: Information about the platform and team

## Components

- **Navbar**: Navigation with ocean-blue theme
- **Footer**: Contact information and links
- **UploadBox**: Drag & drop image upload with preview
- **ResultCard**: Color-coded health results with confidence scores

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── UploadBox.jsx
│   └── ResultCard.jsx
├── pages/
│   ├── Home.jsx
│   ├── Predict.jsx
│   └── About.jsx
├── utils/
│   └── mockApi.js
├── App.jsx
├── main.jsx
└── index.css
```

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to `http://localhost:5173`

## Usage

1. Navigate to the **Predict** page
2. Upload a coral reef image using drag & drop or click to browse
3. Click **"Analyze Coral Health"** button
4. Wait for the 2-second loading animation
5. View the color-coded results:
   - 🟢 **Green**: Healthy coral with confidence percentage
   - 🔴 **Red**: Bleached coral with confidence percentage

## Technology Stack

- **React 18**: Modern React with functional components
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Vite**: Fast build tool and dev server
- **ESLint**: Code linting and formatting

## Mock API

The application uses a mock API (`src/utils/mockApi.js`) that:
- Randomly returns "healthy" or "bleached" predictions
- Generates confidence scores between 70-90%
- Simulates real API behavior with 2-second delay

## Customization

- **Colors**: Modify the ocean theme in `tailwind.config.js`
- **Animations**: Add custom animations in `src/index.css`
- **Components**: Extend or modify components in `src/components/`
- **Pages**: Add new pages in `src/pages/`

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## License

This project is for educational and demonstration purposes.
