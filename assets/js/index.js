// ^ Write your JavaScript code here

// ==> implement scrollspy
const targetSections = document.querySelectorAll(`
  #hero-section,
  #about,
  #portfolio,
  #experience,
  #testimonials,
  #contact
`);

window.addEventListener("scroll", () => {
  for (var i = 0; i < targetSections.length; i++) {
    var rect = targetSections[i].getBoundingClientRect();
    var link = document.querySelector(`a[href="#${targetSections[i].id}"]`);
    if (
      rect.top <= window.innerHeight / 4 &&
      rect.bottom >= window.innerHeight / 4
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  }
});

// ==> implement theme toggle for dark/light mode
document.getElementById("theme-toggle-button").addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});

// ==> implement nav/tabs

var portfolioFilters = document.getElementById("portfolio-filters").children;
var portfolioCards = document.querySelectorAll(".portfolio-item");
var inactiveFilterClasses = [
  "hover:shadow-lg",
  "hover:shadow-primary/50",
  "bg-white",
  "dark:bg-slate-800",
  "text-slate-600",
  "dark:text-slate-300",
  "border",
  "border-slate-300",
  "dark:border-slate-700",
];
var activeFilterClasses = [
  "hover:bg-slate-100",
  "dark:hover:bg-slate-700",
  "active",
  "bg-linear-to-r",
  "from-primary",
  "to-secondary",
  "text-white",
  "shadow-lg",
  "shadow-primary/50",
];

console.log(portfolioCards);
function toggleTabs(tabsElements, activeClassesList, inactiveClassesList) {
  for (let i = 0; i < tabsElements.length; i++) {
    tabsElements[i].addEventListener("click", () => {
      //   console.log(tabsElements[i].dataset.filter);
      for (let j = 0; j < tabsElements.length; j++) {
        tabsElements[j].classList.remove(...activeClassesList);
        tabsElements[j].classList.add(...inactiveClassesList);
      }

      for (let x = 0; x < portfolioCards.length; x++) {
        let card = portfolioCards[x];
        let filter = tabsElements[i].dataset.filter.toLowerCase();
        let category = card.dataset.category.toLowerCase();

        if (filter === "all" || category === filter) {
          card.style.opacity = 1;
          card.style.transform = "scale(1)";
          setTimeout(() => {
            card.style.display = "block";
          }, 500);
        } else {
          card.style.opacity = 0;
          card.style.transform = "scale(0.8)";
          setTimeout(() => {
            card.style.display = "none";
          }, 500);
        }
      }
      tabsElements[i].classList.add(...activeClassesList);
      tabsElements[i].classList.remove(...inactiveClassesList);
    });
  }
}

toggleTabs(portfolioFilters, activeFilterClasses, inactiveFilterClasses);

// ==> implement scroll to top
var scrollToBtn = document.getElementById("scroll-to-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > window.innerHeight / 2) {
    scrollToBtn.classList.remove("invisible", "opacity-0");
    scrollToBtn.classList.add("opacity-100");
  } else {
    scrollToBtn.classList.remove("opacity-100");
    scrollToBtn.classList.add("opacity-0", "invisible");
  }
});

scrollToBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // This won’t affect behavior at the moment, as scroll-behavior: smooth is defined globally in CSS, but I’ll retain it for clarity.
  });
});

// ==> implement carousel logic

var carouselContainer = document.getElementById("testimonials-carousel");
var prevButton = document.getElementById("prev-testimonial");
var nextButton = document.getElementById("next-testimonial");
var carouselIndicators = document
  .getElementById("testimonials")
  .querySelectorAll(".carousel-indicator");

function handleCarouselToggle(
  cardsNumberInView,
  totalCards,
  carouselContainer,
  prevButton,
  nextButton
) {
  var step = 0;
  var cardWidth =
    carouselContainer.getBoundingClientRect().width / cardsNumberInView;

  function updateCarousel() {
    console.log("step", step);
    var moveBy = step * cardWidth;
    carouselContainer.style.transform = `translateX(${moveBy}px)`;
    updateIndicators();
  }

  function goPrev() {
    step += 1;
    if (step > totalCards - cardsNumberInView) {
      step = 0;
    }
    updateCarousel();
  }

  function goNext() {
    step -= 1;
    if (step < 0) {
      step = totalCards - cardsNumberInView;
    }
    updateCarousel();
  }

  prevButton.addEventListener("click", goPrev);
  nextButton.addEventListener("click", goNext);

  // ==> handle indicators logic

  for (let i = 0; i < carouselIndicators.length; i++) {
    carouselIndicators[i].addEventListener("click", () => {
      console.log(carouselIndicators[i]);
      resetIndicators();
      activateIndicator(i);
      step = Number(carouselIndicators[i].dataset.index);
      updateCarousel();
    });
  }

  function resetIndicators() {
    for (let i = 0; i < carouselIndicators.length; i++) {
      carouselIndicators[i].classList.remove(
        "active",
        "bg-accent",
        "scale-125"
      );
      carouselIndicators[i].classList.add("bg-slate-400", "dark:bg-slate-600");
    }
  }

  function activateIndicator(index) {
    carouselIndicators[index].classList.add("active", "bg-accent", "scale-125");
    carouselIndicators[index].classList.remove(
      "bg-slate-400",
      "dark:bg-slate-600"
    );
  }

  function updateIndicators() {
    resetIndicators();
    activateIndicator(step);
  }
}

handleCarouselToggle(3, 6, carouselContainer, prevButton, nextButton);

/*
nonActive style classes

hover:shadow-lg hover:shadow-primary/50 
bg-white dark:bg-slate-800
text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700
*/

/*
 active style classes

hover:bg-slate-100 dark:hover:bg-slate-700 active
bg-linear-to-r from-primary to-secondary text-white shadow-lg shadow-primary/50
*/
