# Wardat Almanazel General Contracting - Website

A professional, responsive static website for Wardat Almanazel General Contracting Company, built with pure HTML, CSS, and vanilla JavaScript.

## Features

- ✅ Fully responsive design (desktop, tablet, mobile)
- ✅ SEO optimized with proper meta tags and semantic HTML
- ✅ Fast loading with no heavy dependencies
- ✅ Modern, professional design
- ✅ Smooth scrolling and animations
- ✅ Contact form with validation
- ✅ Mobile-friendly navigation
- ✅ Arabic + English friendly layout (English content)

## File Structure

```
Wardat-Almanazel/
│
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles
├── js/
│   └── main.js         # JavaScript functionality
└── README.md           # This file
```

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript** - No frameworks
- **Font Awesome** - Icons (via CDN)
- **Google Fonts** - Inter & Playfair Display

## Deployment to GitHub Pages

1. **Create a GitHub repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/wardat-almanazel.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Select the `main` branch as the source
   - Click Save
   - Your site will be available at `https://yourusername.github.io/wardat-almanazel/`

## Local Development

Simply open `index.html` in a web browser, or use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## Customization

### Colors
Edit the CSS variables in `css/style.css`:
```css
:root {
    --primary-color: #1a5490;
    --secondary-color: #d4a574;
    /* ... */
}
```

### Contact Information
Update contact details in `index.html`:
- Phone number
- Email address
- WhatsApp link
- Social media links

### Images
Replace placeholder images with actual company photos:
- Update image URLs in the HTML
- Ensure images are optimized for web
- Use meaningful alt text for SEO

## SEO Files

### robots.txt
Create a `robots.txt` file in the root directory:
```
User-agent: *
Allow: /

Sitemap: https://yourusername.github.io/wardat-almanazel/sitemap.xml
```

### sitemap.xml
Create a `sitemap.xml` file in the root directory:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourusername.github.io/wardat-almanazel/</loc>
    <lastmod>2025-12-19</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- No heavy JavaScript frameworks
- Optimized CSS with minimal dependencies
- Lazy loading for images
- Efficient animations using CSS transforms
- Minified external resources (Font Awesome, Google Fonts)

## License

This website is created for Wardat Almanazel General Contracting Company.

## Contact

For questions or support, please contact the development team.

---

**Built with ❤️ for Wardat Almanazel General Contracting**



