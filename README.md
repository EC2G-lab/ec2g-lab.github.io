# EC2G Group Website

A modern, responsive website for the EC2G (Energy Conversion and Combustion Group) research laboratory at Universidad Técnica Federico Santa María.

## 🏗️ Project Structure

```
ec2g-lab.github.io/
├── index.html              # Home page
├── news.html               # News page
├── staff.html              # Staff directory
├── videos.html             # Research videos
├── network.html            # Collaborations network
├── style.css               # Main stylesheet
├── js/
│   ├── data.js             # Centralized data
│   └── utils.js            # JavaScript utilities
├── staff/
│   ├── avatars/            # Staff profile images
│   └── *.html              # Individual staff pages
├── img/                    # General images
├── logos/                  # Brand assets
└── news/                   # News articles
```

## 🎨 Design Features

- **Responsive Design**: Mobile-first approach with breakpoints at 800px and 1000px
- **Modern UI**: Clean, professional design with consistent branding
- **Accessibility**: Semantic HTML, proper contrast ratios, and keyboard navigation
- **Performance**: Optimized CSS and JavaScript loading

## 🛠️ Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom properties (variables), Flexbox, Grid
- **Vanilla JavaScript**: ES6+ features, modular classes
- **Google Fonts**: Fira Sans for typography

## 📝 Content Management

### Adding New Staff Members

1. **Update `js/data.js`**:
   ```javascript
   // Add to appropriate section (academic, students, collaborators)
   {
     id: "new-member-id",
     name: "Full Name",
     degree: "PhD", // or "MSc" or ""
     title: "Position Title",
     avatar: "staff/avatars/filename.png",
     email: "email@usm.cl"
   }
   ```

2. **Add profile image** to `staff/avatars/`

3. **Create individual page** (optional) at `staff/new-member-id.html`

### Adding News Items

1. **Update `js/data.js`**:
   ```javascript
   {
     id: "news-id",
     title: "News Title",
     date: "2024-12-01",
     image: "img/news-image.jpg", // optional
     content: "News content..."
   }
   ```

### Adding Videos

1. **Update `js/data.js`**:
   ```javascript
   {
     id: "video-id",
     title: "Video Title",
     description: "Video description",
     youtubeId: "YOUTUBE_VIDEO_ID"
   }
   ```

## 🎯 Key Features

### News Carousel (Home Page)
- Auto-advancing slides every 10 seconds
- Manual navigation with arrows and dots
- Responsive design

### Countdown Timer
- Real-time countdown to upcoming events
- Configurable target dates

### ORCID Integration
- Automatic publication loading from ORCID profiles
- Displays latest 5 journal articles
- Links to DOI when available

### Staff Directory
- Dynamic card generation from data
- Responsive grid layout
- Hover effects and smooth transitions

## 🔧 Customization

### Colors
Update CSS variables in `style.css`:
```css
:root {
  --brick: #b85638;        /* Primary brand color */
  --gray-text: #444;       /* Text color */
  --nav-radius: 2.2em;     /* Navigation border radius */
  /* ... other variables */
}
```

### Typography
The site uses Fira Sans from Google Fonts. To change:
1. Update the Google Fonts link in HTML files
2. Modify `font-family` in CSS

## 🚀 Deployment

This is a static website that can be deployed to:
- GitHub Pages (current)
- Netlify
- Vercel
- Any static hosting service

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test across different devices/screens
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

For questions about the website, contact the EC2G group at Universidad Técnica Federico Santa María.