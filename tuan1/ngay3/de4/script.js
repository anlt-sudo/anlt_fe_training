// Tab switching functionality
document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const targetTab = this.getAttribute("data-tab");

      // Remove active class from all tabs and panels
      tabs.forEach((t) => t.classList.remove("active"));
      tabPanels.forEach((panel) => {
        panel.classList.remove("active");
        panel.style.display = "none";
      });

      // Add active class to clicked tab
      this.classList.add("active");

      // Show corresponding panel
      const targetPanel = document.getElementById(targetTab);
      if (targetPanel) {
        targetPanel.classList.add("active");
        targetPanel.style.display = "block";
      }
    });
  });

  // Filter functionality
  const filterBtn = document.querySelector(".filter-btn");
  const filterDropdown = document.getElementById("filterDropdown");
  const filterOptions = document.querySelectorAll(".filter-option");
  const reviewItems = document.querySelectorAll(".review-item");

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
        const stars = item.querySelectorAll(
          ".review-stars img:not(.start-half)"
        );
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

    updateCarousel() {
      const itemWidth = 295 + 20; // card width + gap
      const translateX = -this.currentIndex * itemWidth;
      this.carousel.style.transform = `translateX(${translateX}px)`;
    }

    startAutoSlide() {
      this.stopAutoSlide(); // Clear any existing interval
      this.autoSlideInterval = setInterval(() => {
        this.next();
      }, 30000); // 30 seconds
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
});
