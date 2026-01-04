// ============================================
// Main JavaScript File
// ============================================

// DOM Elements
const navbar = document.getElementById("navbar");
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const scrollTopBtn = document.getElementById("scrollTop");
const currentYear = document.getElementById("currentYear");
const langBtn = document.getElementById("langBtn");
const currentLang = document.getElementById("currentLang");
const html = document.documentElement;

// ============================================
// Language Management
// ============================================
let currentLanguage = localStorage.getItem("language") || "ar"; // Default to Arabic

// Initialize language on page load
function initLanguage() {
  setLanguage(currentLanguage);
}

// Set language function
function setLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem("language", lang);

  // Update HTML attributes
  html.setAttribute("lang", lang);
  html.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

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
    metaDescription.setAttribute("content", t.description);
  }

  // Update Open Graph title
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute("content", t.ogTitle);
  }

  // Update Open Graph description
  let ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute("content", t.ogDescription);
  }
}

// Translate page function
function translatePage(lang) {
  const t = translations[lang];

  // Translate all elements with data-i18n attribute
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const keys = key.split(".");
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
      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
        element.placeholder = value;
      } else if (element.tagName === "LABEL") {
        // For labels, update text but preserve required span
        // The required span will be translated in a separate pass
        const requiredSpan = element.querySelector(".required");
        if (requiredSpan && requiredSpan.hasAttribute("data-i18n")) {
          // Keep the span, just update the label text
          const textNodes = Array.from(element.childNodes).filter(
            (n) => n.nodeType === Node.TEXT_NODE
          );
          textNodes.forEach((node) => node.remove());
          element.insertBefore(
            document.createTextNode(value + " "),
            requiredSpan
          );
        } else if (requiredSpan) {
          // Span exists but no data-i18n, just update label text
          const textNodes = Array.from(element.childNodes).filter(
            (n) => n.nodeType === Node.TEXT_NODE
          );
          textNodes.forEach((node) => node.remove());
          element.insertBefore(
            document.createTextNode(value + " "),
            requiredSpan
          );
        } else {
          element.textContent = value;
        }
      } else {
        element.textContent = value;
      }
    }
  });

  // Translate list items for expertise section
  document.querySelectorAll("[data-i18n-list]").forEach((list) => {
    const key = list.getAttribute("data-i18n-list");
    const keys = key.split(".");
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
      const items = list.querySelectorAll("li");
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
  langBtn.addEventListener("click", () => {
    const newLang = currentLanguage === "ar" ? "en" : "ar";
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
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Show/hide scroll to top button
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});

// ============================================
// Mobile Menu Toggle
// ============================================
if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    mobileMenuToggle.classList.toggle("active");

    // Animate hamburger icon
    const spans = mobileMenuToggle.querySelectorAll("span");
    if (navMenu.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
    } else {
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    }
  });
}

// ============================================
// Close Mobile Menu on Link Click
// ============================================
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    mobileMenuToggle.classList.remove("active");

    // Reset hamburger icon
    const spans = mobileMenuToggle.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  });
});

// ============================================
// Smooth Scrolling for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    // Skip if it's just "#"
    if (href === "#") {
      return;
    }

    const target = document.querySelector(href);

    if (target) {
      e.preventDefault();
      const offsetTop = target.offsetTop - 80; // Account for fixed navbar

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// ============================================
// Active Navigation Link on Scroll
// ============================================
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
});

// ============================================
// Scroll to Top Button
// ============================================
if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ============================================
// Contact Form Handling

// ============================================
// Lazy Loading Images (if needed)
// ============================================
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
        }
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
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
document.addEventListener("DOMContentLoaded", () => {
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
          behavior: "smooth",
        });
      }, 100);
    }
  }

  // Add fade-in animation to elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe service items and other animated elements
  document
    .querySelectorAll(
      ".service-item, .service-card, .division-card, .feature-item"
    )
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      fadeInObserver.observe(el);
    });

  // Initialize carousels
  if (carouselIndicators) {
    initCarouselIndicators();
    updateCarousel();
  }
  if (electronicsCarouselIndicators) {
    initElectronicsCarouselIndicators();
    updateElectronicsCarousel();
  }
  if (maintenanceCarouselIndicators) {
    initMaintenanceCarouselIndicators();
    updateMaintenanceCarousel();
  }
});

// ============================================
// Construction Gallery Modal & Carousel
// ============================================
const civilServiceCard = document.getElementById("civilServiceCard");
const constructionModal = document.getElementById("constructionModal");
const modalClose = document.getElementById("modalClose");
const carouselPrev = document.getElementById("carouselPrev");
const carouselNext = document.getElementById("carouselNext");
const carouselSlides = constructionModal
  ? constructionModal.querySelectorAll(".carousel-slide")
  : [];
const carouselIndicators = document.getElementById("carouselIndicators");
const currentImageSpan = document.getElementById("currentImage");
const totalImagesSpan = document.getElementById("totalImages");

let currentSlideIndex = 0;
const totalSlides = carouselSlides.length;

// Initialize carousel indicators
function initCarouselIndicators() {
  carouselIndicators.innerHTML = "";
  carouselSlides.forEach((_, index) => {
    const indicator = document.createElement("div");
    indicator.className = "carousel-indicator";
    if (index === 0) {
      indicator.classList.add("active");
    }
    indicator.addEventListener("click", () => goToSlide(index));
    carouselIndicators.appendChild(indicator);
  });
  if (totalImagesSpan) {
    totalImagesSpan.textContent = totalSlides;
  }
}

// Update carousel display
function updateCarousel() {
  carouselSlides.forEach((slide, index) => {
    slide.classList.remove("active");
    if (index === currentSlideIndex) {
      slide.classList.add("active");
    }
  });

  // Update indicators
  const indicators = carouselIndicators.querySelectorAll(".carousel-indicator");
  indicators.forEach((indicator, index) => {
    indicator.classList.remove("active");
    if (index === currentSlideIndex) {
      indicator.classList.add("active");
    }
  });

  // Update counter
  if (currentImageSpan) {
    currentImageSpan.textContent = currentSlideIndex + 1;
  }

  // Update button states
  if (carouselPrev) {
    carouselPrev.disabled = currentSlideIndex === 0;
  }
  if (carouselNext) {
    carouselNext.disabled = currentSlideIndex === totalSlides - 1;
  }
}

// Go to specific slide
function goToSlide(index) {
  if (index >= 0 && index < totalSlides) {
    currentSlideIndex = index;
    updateCarousel();
  }
}

// Next slide
function nextSlide() {
  if (currentSlideIndex < totalSlides - 1) {
    currentSlideIndex++;
    updateCarousel();
  }
}

// Previous slide
function prevSlide() {
  if (currentSlideIndex > 0) {
    currentSlideIndex--;
    updateCarousel();
  }
}

// Open modal
function openModal() {
  if (constructionModal) {
    constructionModal.classList.add("active");
    document.body.style.overflow = "hidden";
    currentSlideIndex = 0;
    updateCarousel();
  }
}

// Close modal
function closeModal() {
  if (constructionModal) {
    constructionModal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Event listeners
if (civilServiceCard) {
  civilServiceCard.addEventListener("click", openModal);
}

if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}

if (carouselPrev) {
  carouselPrev.addEventListener("click", prevSlide);
}

if (carouselNext) {
  carouselNext.addEventListener("click", nextSlide);
}

// Close modal on overlay click
if (constructionModal) {
  constructionModal.addEventListener("click", (e) => {
    if (e.target === constructionModal) {
      closeModal();
    }
  });
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (constructionModal && constructionModal.classList.contains("active")) {
    if (e.key === "Escape") {
      closeModal();
    } else if (e.key === "ArrowLeft") {
      if (html.getAttribute("dir") === "rtl") {
        nextSlide();
      } else {
        prevSlide();
      }
    } else if (e.key === "ArrowRight") {
      if (html.getAttribute("dir") === "rtl") {
        prevSlide();
      } else {
        nextSlide();
      }
    }
  }
});

// ============================================
// Electronics Gallery Modal & Carousel
// ============================================
const electricalServiceCard = document.getElementById("electricalServiceCard");
const electronicsModal = document.getElementById("electronicsModal");
const electronicsModalClose = document.getElementById("electronicsModalClose");
const electronicsCarouselPrev = document.getElementById(
  "electronicsCarouselPrev"
);
const electronicsCarouselNext = document.getElementById(
  "electronicsCarouselNext"
);
const electronicsCarouselSlides = electronicsModal
  ? electronicsModal.querySelectorAll(".carousel-slide")
  : [];
const electronicsCarouselIndicators = document.getElementById(
  "electronicsCarouselIndicators"
);
const electronicsCurrentImageSpan = document.getElementById(
  "electronicsCurrentImage"
);
const electronicsTotalImagesSpan = document.getElementById(
  "electronicsTotalImages"
);

let electronicsCurrentSlideIndex = 0;
const electronicsTotalSlides = electronicsCarouselSlides.length;

// Initialize electronics carousel indicators
function initElectronicsCarouselIndicators() {
  if (!electronicsCarouselIndicators) return;
  electronicsCarouselIndicators.innerHTML = "";
  electronicsCarouselSlides.forEach((_, index) => {
    const indicator = document.createElement("div");
    indicator.className = "carousel-indicator";
    if (index === 0) {
      indicator.classList.add("active");
    }
    indicator.addEventListener("click", () => electronicsGoToSlide(index));
    electronicsCarouselIndicators.appendChild(indicator);
  });
  if (electronicsTotalImagesSpan) {
    electronicsTotalImagesSpan.textContent = electronicsTotalSlides;
  }
}

// Update electronics carousel display
function updateElectronicsCarousel() {
  electronicsCarouselSlides.forEach((slide, index) => {
    slide.classList.remove("active");
    if (index === electronicsCurrentSlideIndex) {
      slide.classList.add("active");
    }
  });

  // Update indicators
  if (electronicsCarouselIndicators) {
    const indicators = electronicsCarouselIndicators.querySelectorAll(
      ".carousel-indicator"
    );
    indicators.forEach((indicator, index) => {
      indicator.classList.remove("active");
      if (index === electronicsCurrentSlideIndex) {
        indicator.classList.add("active");
      }
    });
  }

  // Update counter
  if (electronicsCurrentImageSpan) {
    electronicsCurrentImageSpan.textContent = electronicsCurrentSlideIndex + 1;
  }

  // Update button states
  if (electronicsCarouselPrev) {
    electronicsCarouselPrev.disabled = electronicsCurrentSlideIndex === 0;
  }
  if (electronicsCarouselNext) {
    electronicsCarouselNext.disabled =
      electronicsCurrentSlideIndex === electronicsTotalSlides - 1;
  }
}

// Go to specific slide
function electronicsGoToSlide(index) {
  if (index >= 0 && index < electronicsTotalSlides) {
    electronicsCurrentSlideIndex = index;
    updateElectronicsCarousel();
  }
}

// Next slide
function electronicsNextSlide() {
  if (electronicsCurrentSlideIndex < electronicsTotalSlides - 1) {
    electronicsCurrentSlideIndex++;
    updateElectronicsCarousel();
  }
}

// Previous slide
function electronicsPrevSlide() {
  if (electronicsCurrentSlideIndex > 0) {
    electronicsCurrentSlideIndex--;
    updateElectronicsCarousel();
  }
}

// Open electronics modal
function openElectronicsModal() {
  if (electronicsModal) {
    electronicsModal.classList.add("active");
    document.body.style.overflow = "hidden";
    electronicsCurrentSlideIndex = 0;
    updateElectronicsCarousel();
  }
}

// Close electronics modal
function closeElectronicsModal() {
  if (electronicsModal) {
    electronicsModal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Event listeners for electronics modal
if (electricalServiceCard) {
  electricalServiceCard.addEventListener("click", openElectronicsModal);
}

if (electronicsModalClose) {
  electronicsModalClose.addEventListener("click", closeElectronicsModal);
}

if (electronicsCarouselPrev) {
  electronicsCarouselPrev.addEventListener("click", electronicsPrevSlide);
}

if (electronicsCarouselNext) {
  electronicsCarouselNext.addEventListener("click", electronicsNextSlide);
}

// Close electronics modal on overlay click
if (electronicsModal) {
  electronicsModal.addEventListener("click", (e) => {
    if (e.target === electronicsModal) {
      closeElectronicsModal();
    }
  });
}

// Keyboard navigation for electronics modal
document.addEventListener("keydown", (e) => {
  if (electronicsModal && electronicsModal.classList.contains("active")) {
    if (e.key === "Escape") {
      closeElectronicsModal();
    } else if (e.key === "ArrowLeft") {
      if (html.getAttribute("dir") === "rtl") {
        electronicsNextSlide();
      } else {
        electronicsPrevSlide();
      }
    } else if (e.key === "ArrowRight") {
      if (html.getAttribute("dir") === "rtl") {
        electronicsPrevSlide();
      } else {
        electronicsNextSlide();
      }
    }
  }
});

// ============================================
// Maintenance Gallery Modal & Carousel
// ============================================
const maintenanceServiceCard = document.getElementById(
  "maintenanceServiceCard"
);
const maintenanceModal = document.getElementById("maintenanceModal");
const maintenanceModalClose = document.getElementById("maintenanceModalClose");
const maintenanceCarouselPrev = document.getElementById(
  "maintenanceCarouselPrev"
);
const maintenanceCarouselNext = document.getElementById(
  "maintenanceCarouselNext"
);
const maintenanceCarouselSlides = maintenanceModal
  ? maintenanceModal.querySelectorAll(".carousel-slide")
  : [];
const maintenanceCarouselIndicators = document.getElementById(
  "maintenanceCarouselIndicators"
);
const maintenanceCurrentImageSpan = document.getElementById(
  "maintenanceCurrentImage"
);
const maintenanceTotalImagesSpan = document.getElementById(
  "maintenanceTotalImages"
);

let maintenanceCurrentSlideIndex = 0;
const maintenanceTotalSlides = maintenanceCarouselSlides.length;

// Initialize maintenance carousel indicators
function initMaintenanceCarouselIndicators() {
  if (!maintenanceCarouselIndicators) return;
  maintenanceCarouselIndicators.innerHTML = "";
  maintenanceCarouselSlides.forEach((_, index) => {
    const indicator = document.createElement("div");
    indicator.className = "carousel-indicator";
    if (index === 0) {
      indicator.classList.add("active");
    }
    indicator.addEventListener("click", () => maintenanceGoToSlide(index));
    maintenanceCarouselIndicators.appendChild(indicator);
  });
  if (maintenanceTotalImagesSpan) {
    maintenanceTotalImagesSpan.textContent = maintenanceTotalSlides;
  }
}

// Update maintenance carousel display
function updateMaintenanceCarousel() {
  maintenanceCarouselSlides.forEach((slide, index) => {
    slide.classList.remove("active");
    if (index === maintenanceCurrentSlideIndex) {
      slide.classList.add("active");
    }
  });

  // Update indicators
  if (maintenanceCarouselIndicators) {
    const indicators = maintenanceCarouselIndicators.querySelectorAll(
      ".carousel-indicator"
    );
    indicators.forEach((indicator, index) => {
      indicator.classList.remove("active");
      if (index === maintenanceCurrentSlideIndex) {
        indicator.classList.add("active");
      }
    });
  }

  // Update counter
  if (maintenanceCurrentImageSpan) {
    maintenanceCurrentImageSpan.textContent = maintenanceCurrentSlideIndex + 1;
  }

  // Update button states
  if (maintenanceCarouselPrev) {
    maintenanceCarouselPrev.disabled = maintenanceCurrentSlideIndex === 0;
  }
  if (maintenanceCarouselNext) {
    maintenanceCarouselNext.disabled =
      maintenanceCurrentSlideIndex === maintenanceTotalSlides - 1;
  }
}

// Go to specific slide
function maintenanceGoToSlide(index) {
  if (index >= 0 && index < maintenanceTotalSlides) {
    maintenanceCurrentSlideIndex = index;
    updateMaintenanceCarousel();
  }
}

// Next slide
function maintenanceNextSlide() {
  if (maintenanceCurrentSlideIndex < maintenanceTotalSlides - 1) {
    maintenanceCurrentSlideIndex++;
    updateMaintenanceCarousel();
  }
}

// Previous slide
function maintenancePrevSlide() {
  if (maintenanceCurrentSlideIndex > 0) {
    maintenanceCurrentSlideIndex--;
    updateMaintenanceCarousel();
  }
}

// Open maintenance modal
function openMaintenanceModal() {
  if (maintenanceModal) {
    maintenanceModal.classList.add("active");
    document.body.style.overflow = "hidden";
    maintenanceCurrentSlideIndex = 0;
    updateMaintenanceCarousel();
  }
}

// Close maintenance modal
function closeMaintenanceModal() {
  if (maintenanceModal) {
    maintenanceModal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Event listeners for maintenance modal
if (maintenanceServiceCard) {
  maintenanceServiceCard.addEventListener("click", openMaintenanceModal);
}

if (maintenanceModalClose) {
  maintenanceModalClose.addEventListener("click", closeMaintenanceModal);
}

if (maintenanceCarouselPrev) {
  maintenanceCarouselPrev.addEventListener("click", maintenancePrevSlide);
}

if (maintenanceCarouselNext) {
  maintenanceCarouselNext.addEventListener("click", maintenanceNextSlide);
}

// Close maintenance modal on overlay click
if (maintenanceModal) {
  maintenanceModal.addEventListener("click", (e) => {
    if (e.target === maintenanceModal) {
      closeMaintenanceModal();
    }
  });
}

// Keyboard navigation for maintenance modal
document.addEventListener("keydown", (e) => {
  if (maintenanceModal && maintenanceModal.classList.contains("active")) {
    if (e.key === "Escape") {
      closeMaintenanceModal();
    } else if (e.key === "ArrowLeft") {
      if (html.getAttribute("dir") === "rtl") {
        maintenanceNextSlide();
      } else {
        maintenancePrevSlide();
      }
    } else if (e.key === "ArrowRight") {
      if (html.getAttribute("dir") === "rtl") {
        maintenancePrevSlide();
      } else {
        maintenanceNextSlide();
      }
    }
  }
});

// ============================================
// Console Welcome Message
// ============================================
console.log(
  "%cWardat Almanazel General Contracting",
  "color: #1a5490; font-size: 20px; font-weight: bold;"
);
console.log(
  "%cBuilding Excellence Across Saudi Arabia",
  "color: #6c757d; font-size: 14px;"
);
