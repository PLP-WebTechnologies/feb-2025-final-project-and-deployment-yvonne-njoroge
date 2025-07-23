// Theme management

class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme();
        this.setupToggle();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        this.updateThemeIcon();
    }

    updateThemeIcon() {
        const themeBtn = document.getElementById('theme-toggle');
        const icon = themeBtn?.querySelector('i');
        if (icon) {
            icon.className = this.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
    }

    setupToggle() {
        const themeBtn = document.getElementById('theme-toggle');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => this.toggleTheme());
        }
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupActiveLinks();
    }

    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
            });

            // Close menu when clicking on a link
            navMenu.addEventListener('click', (e) => {
                if (e.target.tagName === 'A') {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            });
        }
    }

    setupActiveLinks() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }
}

// Like System
class LikeSystem {
    constructor() {
        this.likes = JSON.parse(localStorage.getItem('blogLikes')) || {};
        this.init();
    }

    init() {
        this.setupLikeButtons();
        this.loadLikeStates();
    }

    setupLikeButtons() {
        const likeButtons = document.querySelectorAll('.like-btn');
        likeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const postId = btn.getAttribute('data-post-id') || this.getCurrentPostId();
                this.toggleLike(postId, btn);
            });
        });
    }

    getCurrentPostId() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id') || '1';
    }

    toggleLike(postId, button) {
        const countSpan = button.querySelector('.like-count');
        const icon = button.querySelector('i');
        let currentCount = parseInt(countSpan.textContent);

        if (this.likes[postId]) {
            // Unlike
            this.likes[postId] = false;
            currentCount--;
            button.classList.remove('liked');
            icon.className = 'far fa-heart';
        } else {
            // Like
            this.likes[postId] = true;
            currentCount++;
            button.classList.add('liked');
            icon.className = 'fas fa-heart';
        }

        countSpan.textContent = currentCount;
        this.saveLikes();
        this.animateButton(button);
    }

    loadLikeStates() {
        const likeButtons = document.querySelectorAll('.like-btn');
        likeButtons.forEach(btn => {
            const postId = btn.getAttribute('data-post-id') || this.getCurrentPostId();
            if (this.likes[postId]) {
                btn.classList.add('liked');
                btn.querySelector('i').className = 'fas fa-heart';
            }
        });
    }

    animateButton(button) {
        button.style.transform = 'scale(1.2)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    }

    saveLikes() {
        localStorage.setItem('blogLikes', JSON.stringify(this.likes));
    }
}

// Blog Post Content Management
class BlogPostManager {
    constructor() {
        this.posts = {
            1: {
                title: "The Future of Web Development",
                category: "Technology",
                date: "December 15, 2024",
                image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop",
                content: `
                    <p>The world of web development is constantly evolving, with new technologies, frameworks, and methodologies emerging at a rapid pace. As we look toward the future, several key trends are shaping how we build and interact with web applications.</p>

                    <h2>The Rise of AI-Powered Development</h2>
                    <p>Artificial Intelligence is revolutionizing how we approach web development. From AI-assisted coding tools that help write cleaner, more efficient code to intelligent design systems that can automatically optimize user interfaces, AI is becoming an indispensable part of the developer's toolkit.</p>

                    <h2>Progressive Web Applications (PWAs)</h2>
                    <p>PWAs continue to bridge the gap between web and native applications. With improved capabilities for offline functionality, push notifications, and device integration, PWAs are becoming the preferred choice for businesses looking to provide app-like experiences without the complexity of native development.</p>

                    <blockquote>
                        "The future of web development lies not just in new technologies, but in how we combine existing tools to create more accessible, performant, and user-friendly experiences."
                    </blockquote>

                    <h2>The Evolution of JavaScript Frameworks</h2>
                    <p>JavaScript frameworks continue to evolve, with a focus on performance, developer experience, and maintainability. New frameworks are emerging that prioritize bundle size optimization and runtime performance, while established frameworks are adopting new paradigms like server-side rendering and edge computing.</p>

                    <h2>WebAssembly and Performance</h2>
                    <p>WebAssembly (WASM) is opening new possibilities for web applications by allowing high-performance languages like Rust and C++ to run in the browser. This technology is particularly exciting for applications that require intensive computations, such as image processing, games, and scientific simulations.</p>

                    <h2>Sustainability in Web Development</h2>
                    <p>As environmental consciousness grows, developers are increasingly focused on creating sustainable web applications. This includes optimizing for energy efficiency, reducing data transfer, and choosing hosting solutions powered by renewable energy.</p>

                    <p>The future of web development is bright and full of possibilities. By staying curious, continuously learning, and focusing on user needs, developers can create amazing experiences that push the boundaries of what's possible on the web.</p>
                `
            },
            2: {
                title: "Adventures in Mountain Hiking",
                category: "Travel",
                date: "December 10, 2024",
                image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=800&h=400&fit=crop",
                content: `
                    <p>There's something magical about standing on a mountain peak, looking out over vast landscapes that stretch beyond the horizon. My recent hiking adventure taught me valuable lessons about perseverance, preparation, and the beauty of nature.</p>

                    <h2>The Journey Begins</h2>
                    <p>Our expedition started before dawn, with headlamps cutting through the darkness as we began our ascent. The trail was challenging, winding through dense forests and across rocky terrain that tested both our physical endurance and mental determination.</p>

                    <h2>Lessons from the Trail</h2>
                    <p>Mountain hiking teaches you to respect nature's power while pushing your own limits. Every step requires focus, every breath becomes precious at higher altitudes, and every view reminds you why the journey is worth it.</p>

                    <blockquote>
                        "Mountains have a way of dealing with overconfidence. They humble you and reward you in equal measure."
                    </blockquote>

                    <h2>Essential Gear and Preparation</h2>
                    <p>Proper preparation is crucial for mountain hiking. From weather-appropriate clothing to navigation tools and emergency supplies, every item in your pack serves a purpose. I learned the hard way that cutting corners on gear can turn an adventure into a dangerous situation.</p>

                    <h2>The Summit Experience</h2>
                    <p>Reaching the summit after hours of climbing brings a unique sense of accomplishment. The panoramic views, the sense of achievement, and the camaraderie with fellow hikers create memories that last a lifetime.</p>

                    <p>Mountain hiking isn't just about reaching the top – it's about the journey, the challenges overcome, and the personal growth that happens along the way. Each trail offers new lessons and fresh perspectives on life.</p>
                `
            }
        };
        this.init();
    }

    init() {
        if (this.isOnBlogPostPage()) {
            this.loadPost();
        }
    }

    isOnBlogPostPage() {
        return window.location.pathname.includes('blog-post.html');
    }

    loadPost() {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id') || '1';
        const post = this.posts[postId];

        if (post) {
            document.getElementById('post-title').textContent = post.title;
            document.getElementById('post-category').textContent = post.category;
            document.getElementById('post-date').textContent = post.date;
            document.getElementById('post-image').src = post.image;
            document.getElementById('post-content').innerHTML = post.content;
        }
    }
}

// Filter System for Categories Page
class FilterSystem {
    constructor() {
        this.init();
    }

    init() {
        if (this.isOnCategoriesPage()) {
            this.setupFilters();
            this.setupSearch();
        }
    }

    isOnCategoriesPage() {
        return window.location.pathname.includes('categories.html');
    }

    setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const posts = document.querySelectorAll('.post-card');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.getAttribute('data-category');
                
                // Update active filter button
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filter posts
                this.filterPosts(posts, category);
            });
        });
    }

    setupSearch() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchPosts(e.target.value);
            });
        }
    }

    filterPosts(posts, category) {
        let visibleCount = 0;

        posts.forEach(post => {
            const postCategory = post.getAttribute('data-category');
            const shouldShow = category === 'all' || postCategory === category;
            
            if (shouldShow) {
                post.classList.remove('hidden');
                visibleCount++;
            } else {
                post.classList.add('hidden');
            }
        });

        this.toggleNoResults(visibleCount === 0);
    }

    searchPosts(searchTerm) {
        const posts = document.querySelectorAll('.post-card');
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-category');
        let visibleCount = 0;

        posts.forEach(post => {
            const postCategory = post.getAttribute('data-category');
            const postTitle = post.querySelector('h3').textContent.toLowerCase();
            const postContent = post.querySelector('p').textContent.toLowerCase();
            
            const matchesSearch = searchTerm === '' || 
                                postTitle.includes(searchTerm.toLowerCase()) || 
                                postContent.includes(searchTerm.toLowerCase());
            
            const matchesFilter = activeFilter === 'all' || postCategory === activeFilter;
            
            if (matchesSearch && matchesFilter) {
                post.classList.remove('hidden');
                visibleCount++;
            } else {
                post.classList.add('hidden');
            }
        });

        this.toggleNoResults(visibleCount === 0);
    }

    toggleNoResults(show) {
        const noResults = document.getElementById('noResults');
        const postsGrid = document.getElementById('postsGrid');
        
        if (noResults && postsGrid) {
            noResults.style.display = show ? 'block' : 'none';
            postsGrid.style.display = show ? 'none' : 'grid';
        }
    }
}

// Contact Form Management
class ContactFormManager {
    constructor() {
        this.init();
    }

    init() {
        if (this.isOnContactPage()) {
            this.setupForm();
        }
    }

    isOnContactPage() {
        return window.location.pathname.includes('contact.html');
    }

    setupForm() {
        const form = document.getElementById('contactForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit(form);
            });

            // Real-time validation
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearError(input));
            });
        }
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Clear previous error
        this.clearError(field);

        switch (fieldName) {
            case 'name':
                if (value.length < 2) {
                    errorMessage = 'Name must be at least 2 characters long';
                    isValid = false;
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;
            case 'subject':
                if (!value) {
                    errorMessage = 'Please select a subject';
                    isValid = false;
                }
                break;
            case 'message':
                if (value.length < 10) {
                    errorMessage = 'Message must be at least 10 characters long';
                    isValid = false;
                }
                break;
        }

        if (!isValid) {
            this.showError(field, errorMessage);
        }

        return isValid;
    }

    showError(field, message) {
        const errorElement = document.getElementById(field.name + 'Error');
        if (errorElement) {
            errorElement.textContent = message;
            field.classList.add('error');
        }
    }

    clearError(field) {
        const errorElement = document.getElementById(field.name + 'Error');
        if (errorElement) {
            errorElement.textContent = '';
            field.classList.remove('error');
        }
    }

    handleSubmit(form) {
        const formData = new FormData(form);
        let isValid = true;

        // Validate all fields
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            // Simulate form submission
            this.showSuccess();
            form.reset();
        }
    }

    showSuccess() {
        const form = document.getElementById('contactForm');
        const success = document.getElementById('formSuccess');
        
        if (form && success) {
            form.style.display = 'none';
            success.style.display = 'block';
            
            // Hide success message and show form again after 5 seconds
            setTimeout(() => {
                form.style.display = 'block';
                success.style.display = 'none';
            }, 5000);
        }
    }
}

// Animation Manager
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.addPageLoadAnimations();
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, { threshold: 0.1 });

        const animatedElements = document.querySelectorAll('.post-card, .detail-card, .faq-item, .timeline-item');
        animatedElements.forEach(el => observer.observe(el));
    }

    addPageLoadAnimations() {
        setTimeout(() => {
            const hero = document.querySelector('.hero, .about-hero, .contact-hero, .categories-hero');
            if (hero) {
                hero.classList.add('slide-up');
            }
        }, 100);
    }
}

// Share Functionality
class ShareManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupShareButtons();
        this.setupBookmarkButtons();
    }

    setupShareButtons() {
        const shareButtons = document.querySelectorAll('.share-btn');
        shareButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.sharePost();
            });
        });
    }

    setupBookmarkButtons() {
        const bookmarkButtons = document.querySelectorAll('.bookmark-btn');
        bookmarkButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.toggleBookmark(btn);
            });
        });
    }

    async sharePost() {
        const url = window.location.href;
        const title = document.querySelector('h1').textContent;
        const text = 'Check out this blog post: ' + title;

        if (navigator.share) {
            try {
                await navigator.share({ title, text, url });
            } catch (err) {
                this.fallbackShare(url);
            }
        } else {
            this.fallbackShare(url);
        }
    }

    fallbackShare(url) {
        navigator.clipboard.writeText(url).then(() => {
            this.showToast('Link copied to clipboard!');
        });
    }

    toggleBookmark(button) {
        const icon = button.querySelector('i');
        const isBookmarked = icon.classList.contains('fas');
        
        if (isBookmarked) {
            icon.className = 'far fa-bookmark';
            button.style.color = 'var(--text-secondary)';
            this.showToast('Bookmark removed');
        } else {
            icon.className = 'fas fa-bookmark';
            button.style.color = 'var(--primary-color)';
            this.showToast('Post bookmarked!');
        }
    }

    showToast(message) {
        // Simple toast notification
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new NavigationManager();
    new LikeSystem();
    new BlogPostManager();
    new FilterSystem();
    new ContactFormManager();
    new AnimationManager();
    new ShareManager();
});

// Add smooth scrolling for anchor links
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Performance optimization: lazy load images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
    });
} else {
    // Fallback for browsers that don't support native lazy loading
    const script = document.createElement('script');
    script.src = 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver';
    document.head.appendChild(script);
}