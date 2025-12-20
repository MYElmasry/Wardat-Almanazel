// ============================================
// Main JavaScript File
// ============================================

// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTopBtn = document.getElementById('scrollTop');
const contactForm = document.getElementById('contactForm');
const currentYear = document.getElementById('currentYear');
const langBtn = document.getElementById('langBtn');
const currentLang = document.getElementById('currentLang');
const html = document.documentElement;

// ============================================
// Language Management
// ============================================
let currentLanguage = localStorage.getItem('language') || 'ar'; // Default to Arabic

// Initialize language on page load
function initLanguage() {
    setLanguage(currentLanguage);
}

// Set language function
function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Update HTML attributes
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    
    // Update language button text
    if (currentLang) {
        currentLang.textContent = translations[lang].lang;
    }
    
    // Update head elements (title and meta tags)
    updateHeadElements(lang);
    
    // Translate all elements
    translatePage(lang);
}

// Update head elements based on language
function updateHeadElements(lang) {
    const t = translations[lang].meta;
    
    // Update page title
    document.title = t.title;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', t.description);
    }
    
    // Update Open Graph title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.setAttribute('content', t.ogTitle);
    }
    
    // Update Open Graph description
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
        ogDescription.setAttribute('content', t.ogDescription);
    }
}

// Translate page function
function translatePage(lang) {
    const t = translations[lang];
    
    // Translate all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let value = t;
        
        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                value = null;
                break;
            }
        }
        
        if (value !== null && value !== undefined) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = value;
            } else if (element.tagName === 'LABEL') {
                // For labels, update text but preserve required span
                // The required span will be translated in a separate pass
                const requiredSpan = element.querySelector('.required');
                if (requiredSpan && requiredSpan.hasAttribute('data-i18n')) {
                    // Keep the span, just update the label text
                    const textNodes = Array.from(element.childNodes).filter(n => n.nodeType === Node.TEXT_NODE);
                    textNodes.forEach(node => node.remove());
                    element.insertBefore(document.createTextNode(value + ' '), requiredSpan);
                } else if (requiredSpan) {
                    // Span exists but no data-i18n, just update label text
                    const textNodes = Array.from(element.childNodes).filter(n => n.nodeType === Node.TEXT_NODE);
                    textNodes.forEach(node => node.remove());
                    element.insertBefore(document.createTextNode(value + ' '), requiredSpan);
                } else {
                    element.textContent = value;
                }
            } else {
                element.textContent = value;
            }
        }
    });
    
    // Translate list items for expertise section
    document.querySelectorAll('[data-i18n-list]').forEach(list => {
        const key = list.getAttribute('data-i18n-list');
        const keys = key.split('.');
        let value = t;
        
        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                value = null;
                break;
            }
        }
        
        if (value && Array.isArray(value)) {
            const items = list.querySelectorAll('li');
            items.forEach((item, index) => {
                if (value[index]) {
                    item.textContent = value[index];
                }
            });
        }
    });
}

// Language switcher button click
if (langBtn) {
    langBtn.addEventListener('click', () => {
        const newLang = currentLanguage === 'ar' ? 'en' : 'ar';
        setLanguage(newLang);
    });
}

// ============================================
// Set Current Year
// ============================================
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// ============================================
// Navbar Scroll Effect
// ============================================
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Show/hide scroll to top button
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// ============================================
// Mobile Menu Toggle
// ============================================
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// ============================================
// Close Mobile Menu on Link Click
// ============================================
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        
        // Reset hamburger icon
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ============================================
// Smooth Scrolling for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') {
            return;
        }

        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Active Navigation Link on Scroll
// ============================================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ============================================
// Scroll to Top Button
// ============================================
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// Contact Form Handling
// ============================================
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formMessage = document.getElementById('formMessage');
        const formData = new FormData(contactForm);
        
        // Get form values
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !message) {
            const errorMsg = currentLanguage === 'ar' 
                ? translations.ar.contact.form.error 
                : translations.en.contact.form.error;
            showFormMessage(errorMsg, 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            const errorMsg = currentLanguage === 'ar' 
                ? translations.ar.contact.form.emailError 
                : translations.en.contact.form.emailError;
            showFormMessage(errorMsg, 'error');
            return;
        }
        
        // Simulate form submission (for static site)
        // In a real implementation, this would send data to a server
        const successMsg = currentLanguage === 'ar' 
            ? translations.ar.contact.form.success 
            : translations.en.contact.form.success;
        showFormMessage(successMsg, 'success');
        
        // Reset form
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
            formMessage.classList.remove('success', 'error');
        }, 5000);
    });
}

// ============================================
// Show Form Message
// ============================================
function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ============================================
// Lazy Loading Images (if needed)
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// Performance: Debounce Function
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events with debouncing
const handleScroll = debounce(() => {
    // Scroll-related operations
}, 10);

// ============================================
// Initialize on DOM Load
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize language
    initLanguage();
    
    // Set active nav link on page load
    const currentHash = window.location.hash;
    if (currentHash) {
        const targetSection = document.querySelector(currentHash);
        if (targetSection) {
            setTimeout(() => {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
    
    // Add fade-in animation to elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe service items and other animated elements
    document.querySelectorAll('.service-item, .service-card, .division-card, .feature-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(el);
    });
});

// ============================================
// Console Welcome Message
// ============================================
console.log('%cWardat Almanazel General Contracting', 'color: #1a5490; font-size: 20px; font-weight: bold;');
console.log('%cBuilding Excellence Across Saudi Arabia', 'color: #6c757d; font-size: 14px;');

