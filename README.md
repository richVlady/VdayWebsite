# Valentine's Day Surprise Website 💕

A playful, maximalist single-page Valentine's Day web application built with React, Tailwind CSS, and Framer Motion. Features an inconspicuous login screen that transforms into a vibrant, interactive Valentine's Day experience.

## Features

- **Inconspicuous Login Screen**: Professional research portal appearance that hides the Valentine's Day theme
- **Smooth Animations**: Powered by Framer Motion for seamless state transitions
- **Interactive Elements**: 
  - Teleporting "No" button that moves when hovered/touched
  - Pulsing "Yes" button
  - Floating heart animations
- **Confetti Celebration**: Massive confetti explosion using canvas-confetti
- **Fully Responsive**: Works beautifully on desktop, tablet, and mobile devices
- **Maximalist Design**: Vibrant pinks, reds, sparkles, and hearts throughout

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **canvas-confetti** - Confetti effects
- **Google Fonts** - Pacifico & Fredoka One for playful typography

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Place your meme/image in the `public` folder:
   - Name it `basketball-meme.jpg` (or update the filename in `src/App.jsx`)

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser to the URL shown (typically `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## Customization Guide

### Change Login Credentials

Edit the constants in `src/App.jsx`:

```javascript
const VALID_USERNAME = 'YourUsername'
const VALID_PASSWORD = 'YourPassword'
```

### Customize the Question Text

In the "Question" state section of `src/App.jsx`, find:

```javascript
Will you be my valentine?
<br />
<span className="text-3xl md:text-5xl lg:text-6xl">- Richard</span>
```

Change "Will you be my valentine?" and "- Richard" to your own text.

### Change the Success Screen Image

1. Replace the image in the `public` folder with your own
2. Update the image path in `src/App.jsx`:

```javascript
src="/basketball-meme.jpg"  // Change to your filename
```

### Change the Success Text

Find the "MAJORRR" text in the success state and replace it:

```javascript
MAJORRR  // Change to your own text
```

### Modify Colors and Styling

The app uses Tailwind CSS classes. Key color areas:

- **Login Screen**: Dark slate/blue theme (lines 117, 129, etc.)
- **Loading Screen**: Pink/red gradient (line 221)
- **Question Screen**: Pink/red/rose gradients (line 246)
- **Success Screen**: Pink/red/rose gradients (line 315)

Search for color classes like `bg-pink-`, `text-red-`, `from-rose-` to customize.

### Adjust Animation Timing

- **Loading Duration**: Change the `2500` value (milliseconds) in the `useEffect` hook around line 28
- **Confetti Duration**: Modify the `duration` variable (currently `5000`) around line 38

### Change Fonts

1. Update `index.html` to include different Google Fonts
2. Modify `tailwind.config.js` to add your font families
3. Update font classes in `src/App.jsx` (e.g., `font-pacifico`, `font-fredoka`)

## Project Structure

```
VDAYwebsite/
├── public/
│   └── basketball-meme.jpg    # Your success screen image
├── src/
│   ├── App.jsx                 # Main application component
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles and Tailwind imports
├── index.html                  # HTML template
├── package.json                # Dependencies
├── tailwind.config.js          # Tailwind configuration
├── vite.config.js              # Vite configuration
└── README.md                   # This file
```

## How It Works

1. **Login State**: User enters credentials (hardcoded in the component)
2. **Loading State**: Shows a spinner for 2.5 seconds
3. **Question State**: Displays the Valentine's question with Yes/No buttons
   - "No" button teleports to random positions on hover/touch
   - "Yes" button pulses with animation
4. **Success State**: Shows the meme image and celebration text with confetti

## Tips for Customization

- **Different Theme**: Change the color scheme by replacing pink/red/rose colors with your preferred palette
- **Add More States**: You can add additional screens by adding new state values and corresponding UI sections
- **Custom Animations**: Use Framer Motion's animation props to create unique transitions
- **Different Images**: Replace hearts with other emojis or icons
- **Sound Effects**: Add audio files and play them on button clicks using the HTML5 Audio API

## Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Feel free to use, modify, and adapt this project for your own Valentine's Day surprises! 💝

## Credits

Built with ❤️ using React, Tailwind CSS, and Framer Motion.

---

**Note**: Remember to update the login credentials, text content, and image to personalize it for your special someone!
