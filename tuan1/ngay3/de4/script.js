// Filter functionality
const filterBtn = document.querySelector(".filter-btn");
const filterDropdown = document.getElementById("filterDropdown");
const filterOptions = document.querySelectorAll(".filter-option");
const reviewItems = document.querySelectorAll(".review-item");

// Tab switching functionality
const tabs = document.querySelectorAll(".tab");
const tabPanels = document.querySelectorAll(".tab-panel");
const tabContainer = document.querySelector(".product-tabs");

// Tab switching functionality
document.addEventListener("DOMContentLoaded", function () {
  tabContainer.addEventListener("click", (e) => {
    const clickedTab = e.target.closest(".tab");
    if (!clickedTab) return;

    const targetTab = clickedTab.getAttribute("data-tab");

    // Remove active states
    document.querySelector(".tab.active")?.classList.remove("active");
    document.querySelector(".tab-panel.active")?.classList.remove("active");

    // Hide all panels
    document.querySelectorAll(".tab-panel").forEach((panel) => {
      panel.style.display = "none";
    });

    // Activate new tab and panel
    clickedTab.classList.add("active");
    const targetPanel = document.getElementById(targetTab);
    if (targetPanel) {
      targetPanel.classList.add("active");
      targetPanel.style.display = "block";
    }
  });
});

// Toggle filter dropdown
if (filterBtn) {
  filterBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    filterDropdown.classList.toggle("show");
  });
}

// Close dropdown when clicking outside
document.addEventListener("click", function (e) {
  if (!e.target.closest(".filter-container")) {
    filterDropdown.classList.remove("show");
  }
});

// Handle filter option selection
filterOptions.forEach((option) => {
  option.addEventListener("click", function () {
    const selectedRating = this.getAttribute("data-rating");

    // Remove active class from all options
    filterOptions.forEach((opt) => opt.classList.remove("active"));
    // Add active class to selected option
    this.classList.add("active");

    // Filter reviews
    filterReviews(selectedRating);

    // Close dropdown
    filterDropdown.classList.remove("show");
  });
});

// Function to filter reviews by rating
function filterReviews(rating) {
  reviewItems.forEach((item) => {
    if (rating === "all") {
      item.style.display = "block";
    } else {
      const stars = item.querySelectorAll(".review-stars img:not(.start-half)");
      const reviewRating = stars.length;

      if (reviewRating.toString() === rating) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    }
  });
}

// Product Carousel functionality
class ProductCarousel {
  constructor() {
    this.carousel = document.getElementById("productsGrid");
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.currentIndex = 0;
    this.itemsPerView = 4;
    this.totalItems = document.querySelectorAll(".product-card").length;
    this.maxIndex = Math.max(0, this.totalItems - this.itemsPerView);
    this.autoSlideInterval = null;
    this.isMobile = window.innerWidth <= 768;
    this.setupMobileScroll();

    // Thêm event listener cho window resize
    window.addEventListener("resize", () => {
      this.isMobile = window.innerWidth <= 768;
      this.setupMobileScroll();
    });

    this.init();
  }

  init() {
    this.bindEvents();
    this.updateCarousel();
    this.startAutoSlide();
  }

  bindEvents() {
    this.nextBtn.addEventListener("click", () => {
      this.next();
      this.resetAutoSlide();
    });

    this.prevBtn.addEventListener("click", () => {
      this.prev();
      this.resetAutoSlide();
    });

    // Pause auto-slide on hover
    this.carousel.parentElement.addEventListener("mouseenter", () => {
      this.stopAutoSlide();
    });

    this.carousel.parentElement.addEventListener("mouseleave", () => {
      this.startAutoSlide();
    });
  }

  next() {
    if (this.currentIndex < this.maxIndex) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Loop back to start
    }
    this.updateCarousel();
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.maxIndex; // Loop to end
    }
    this.updateCarousel();
  }

  setupMobileScroll() {
    if (this.isMobile) {
      // Dừng auto slide trên mobile
      this.stopAutoSlide();

      // Thêm event listener cho scroll
      this.carousel.parentElement.addEventListener("scroll", () => {
        // Cập nhật currentIndex dựa trên scroll position
        const scrollLeft = this.carousel.parentElement.scrollLeft;
        const itemWidth = 198 + 20; // card width + gap
        this.currentIndex = Math.round(scrollLeft / itemWidth);
      });
    } else {
      // Khởi động lại auto slide cho desktop
      this.startAutoSlide();
    }
  }

  updateCarousel() {
    if (this.isMobile) {
      // Sử dụng scrollIntoView trên mobile
      const items = this.carousel.querySelectorAll(".product-card");
      if (items[this.currentIndex]) {
        items[this.currentIndex].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
      }
    } else {
      const itemWidth = 295 + 20; // card width + gap
      const translateX = -this.currentIndex * itemWidth;
      this.carousel.style.transform = `translateX(${translateX}px)`;
    }
  }

  startAutoSlide() {
    this.stopAutoSlide(); // Clear any existing interval
    this.autoSlideInterval = setInterval(() => {
      this.next();
    }, 300000); // 30 seconds
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  resetAutoSlide() {
    this.stopAutoSlide();
    this.startAutoSlide();
  }
}

// Initialize carousel
new ProductCarousel();

document.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 0) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const header = document.querySelector(".header");

  menuToggle?.addEventListener("click", () => {
    header.classList.toggle("menu-open");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!header.contains(e.target) && header.classList.contains("menu-open")) {
      header.classList.remove("menu-open");
    }
  });
});
