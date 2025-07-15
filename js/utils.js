// ===== UTILITY FUNCTIONS =====

// News Carousel functionality
class NewsCarousel {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.slides = [];
    this.dots = [];
    this.currentSlide = 0;
    this.autoAdvanceInterval = null;
    
    this.init();
  }
  
  init() {
    // Generate slides from data
    this.generateSlides();
    
    // Set up navigation buttons
    const prevBtn = this.container.querySelector('#prev-news');
    const nextBtn = this.container.querySelector('#next-news');
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.prevSlide());
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextSlide());
    }
    
    // Set up dot navigation
    this.dots.forEach((dot, i) => {
      dot.addEventListener('click', () => this.showSlide(i));
    });
    
    // Start auto-advance
    this.startAutoAdvance();
    
    // Show first slide
    this.showSlide(0);
  }
  
  generateSlides() {
    // Get the last 5 news items from data
    const newsItems = EC2GData.news
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
    
    const dotsContainer = this.container.querySelector('.news-dots');
    
    // Clear existing content
    dotsContainer.innerHTML = '';
    
    // Generate slides and dots
    newsItems.forEach((newsItem, index) => {
      // Create slide
      const slide = document.createElement('div');
      slide.className = `news-slide ${index === 0 ? 'active' : ''}`;
      
      let slideContent = '';
      
      // Add image if available
      if (newsItem.image) {
        slideContent += `<img src="${newsItem.image}" alt="${newsItem.title}">`;
      }
      
      // Add content
      slideContent += `<p class="text-justify">${newsItem.content}</p>`;
      
      slide.innerHTML = slideContent;
      
      // Insert slide before the buttons
      const buttons = this.container.querySelector('#prev-news');
      this.container.insertBefore(slide, buttons);
      this.slides.push(slide);
      
      // Create dot
      const dot = document.createElement('span');
      dot.className = `news-dot ${index === 0 ? 'active' : ''}`;
      dotsContainer.appendChild(dot);
      this.dots.push(dot);
    });
  }
  
  showSlide(idx) {
    this.slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
      if (this.dots[i]) {
        this.dots[i].classList.toggle('active', i === idx);
      }
    });
    this.currentSlide = idx;
  }
  
  nextSlide() {
    const idx = (this.currentSlide + 1) % this.slides.length;
    this.showSlide(idx);
  }
  
  prevSlide() {
    const idx = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.showSlide(idx);
  }
  
  startAutoAdvance() {
    this.autoAdvanceInterval = setInterval(() => {
      this.nextSlide();
    }, 10000); // 10 seconds
  }
  
  stopAutoAdvance() {
    if (this.autoAdvanceInterval) {
      clearInterval(this.autoAdvanceInterval);
    }
  }
}

// Countdown Timer functionality
class CountdownTimer {
  constructor(elementId, targetDate) {
    this.element = document.getElementById(elementId);
    this.targetDate = new Date(targetDate);
    this.interval = null;
    
    this.init();
  }
  
  init() {
    this.updateCountdown();
    this.interval = setInterval(() => this.updateCountdown(), 1000);
  }
  
  updateCountdown() {
    const now = new Date();
    const diff = this.targetDate - now;
    
    if (diff <= 0) {
      this.element.innerHTML = "The event has started!";
      this.stop();
      return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    
    this.element.innerHTML = `
      Start in: <span id="days">${days}</span> days, 
      <span id="hours">${hours}</span> hours, 
      <span id="minutes">${minutes}</span> minutes, 
      <span id="seconds">${seconds}</span> seconds
    `;
  }
  
  stop() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}

// ORCID Publications loader
class ORCIDPublications {
  constructor(containerId, orcId) {
    this.container = document.getElementById(containerId);
    this.orcId = orcId;
    
    this.init();
  }
  
  async init() {
    try {
      await this.loadPublications();
    } catch (error) {
      console.error('Error loading ORCID publications:', error);
      this.container.innerHTML = '<p>Unable to load publications at this time.</p>';
    }
  }
  
  async loadPublications() {
    // Fetch all works from ORCID
    const resp = await fetch(
      `https://pub.orcid.org/v3.0/${this.orcId}/works`,
      { headers: { Accept: "application/json" } }
    );
    
    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }
    
    const data = await resp.json();
    const group = data['group'] || [];
    
    // Extract only journal articles, sort by date, get latest 5
    const journalPubs = group
      .map(item => {
        const summary = item['work-summary'][0];
        const type = summary['type'];
        const pubDate = summary['publication-date'];
        const year = pubDate?.year?.value || '';
        const month = pubDate?.month?.value || '01';
        const day = pubDate?.day?.value || '01';
        const dateNum = Number(`${year}${month.padStart(2, '0')}${day.padStart(2, '0')}`);
        
        return {
          putCode: summary['put-code'],
          dateNum,
          type,
          title: summary.title?.title?.value || 'Untitled',
          year: year,
          url: summary.url?.value || null
        };
      })
      .filter(pub => pub.type === 'journal-article')
      .sort((a, b) => b.dateNum - a.dateNum)
      .slice(0, 5);
    
    this.displayPublications(journalPubs);
  }
  
  displayPublications(publications) {
    if (publications.length === 0) {
      this.container.innerHTML = '<p>No publications found.</p>';
      return;
    }
    
    const pubList = document.createElement('ul');
    pubList.id = 'pub-list';
    
    publications.forEach(pub => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${pub.title}</strong> (${pub.year})
        ${pub.url ? `<br><a href="${pub.url}" target="_blank">View Publication</a>` : ''}
      `;
      pubList.appendChild(li);
    });
    
    this.container.innerHTML = '';
    this.container.appendChild(pubList);
  }
}

// Template loader for common elements
class TemplateLoader {
  static async loadHeader() {
    const headerTemplate = `
      <header>
        <div class="header-bar">
          <div class="header-logo">
            <img src="logos/ec2g.svg" alt="EC2G Logo">
          </div>
          <nav class="header-nav">
            <a href="index.html">Home</a>
            <a href="news.html">News</a>
            <a href="staff.html">Staff</a>
            <a href="videos.html">Videos</a>
            <a href="network.html">Network</a>
          </nav>
        </div>
      </header>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', headerTemplate);
  }
  
  static async loadFooter() {
    const footerTemplate = `
      <footer>
        &copy; 2025 EC2G - UTFSM
      </footer>
    `;
    
    document.body.insertAdjacentHTML('beforeend', footerTemplate);
  }
}

// Initialize common components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize news carousel if it exists
  const newsCarousel = document.querySelector('.news-carousel');
  if (newsCarousel) {
    new NewsCarousel('news-carousel');
  }
  
  // Initialize countdown timer if it exists
  const countdownElement = document.getElementById('countdown');
  if (countdownElement) {
    // You can customize the target date here
    new CountdownTimer('countdown', '2025-11-02T17:00:00');
  }
  
  // Initialize ORCID publications if they exist
  const orcidLink = document.getElementById('orcid-link');
  if (orcidLink) {
    const orcId = orcidLink.textContent;
    const publicationsContainer = document.getElementById('publications');
    if (publicationsContainer) {
      new ORCIDPublications('publications', orcId);
    }
  }
});

// Export for use in other scripts
window.EC2GUtils = {
  NewsCarousel,
  CountdownTimer,
  ORCIDPublications,
  TemplateLoader
}; 