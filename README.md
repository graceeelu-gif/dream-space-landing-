# Dream Space Tool - Landing Page

A beautiful product landing page for the Dream Space Tool AI interior design app.

## How to Add Images

1. Add your room images to the `images/` folder
2. Name them `room1.jpg`, `room2.jpg`, `room3.jpg`, `room4.jpg` (or update the filenames in `index.html`)
3. The images will automatically cycle every 2 seconds

### To change the cycling speed:
Open `script.js` and change the `INTERVAL` value (in milliseconds):
- `1000` = 1 second (fast)
- `2000` = 2 seconds (default)
- `3000` = 3 seconds (slower)

### To add more images:
Add more `<img>` tags in `index.html` inside the `.image-carousel` div:
```html
<img src="images/room5.jpg" alt="Description" class="carousel-image">
```

## How to Preview Locally

Simply open `index.html` in your web browser.

Or use a local server:
```bash
npx serve .
```

## How to Deploy

### Option 1: Vercel
```bash
npm i -g vercel
vercel
```

### Option 2: Netlify
Drag and drop the folder to [netlify.com/drop](https://netlify.com/drop)

### Option 3: GitHub Pages
1. Create a new GitHub repo
2. Push this folder to the repo
3. Enable GitHub Pages in repo settings

## Customization

- **Colors**: Edit the hex values in `styles.css`
- **Button link**: Change the `href` in the `.cta-button` link in `index.html`
- **Text content**: Edit directly in `index.html`
