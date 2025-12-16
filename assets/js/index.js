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

// window.addEventListener("scroll", () => {
//   for (var i = 0; i < targetSections.length; i++) {
//     var rect = targetSections[i].getBoundingClientRect();
//     var link = document.querySelector(`a[href="#${targetSections[i].id}"]`);
//     if (
//       rect.top <= window.innerHeight / 4 &&
//       rect.bottom >= window.innerHeight / 4
//     ) {
//       link.classList.add("active");
//     } else {
//       link.classList.remove("active");
//     }
//   }
// });

// another approach using Intersection Observer API which is more efficient for performance
var observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.25,
};

var observer = new IntersectionObserver(observerCallback, observerOptions);

function observerCallback(entries, observer) {
  for (var i = 0; i < entries.length; i++) {
    var link = document.querySelector(`a[href="#${entries[i].target.id}"]`);
    if (entries[i].isIntersecting) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  }
}
for (var i = 0; i < targetSections.length; i++) {
  observer.observe(targetSections[i]);
}

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

function toggleTabs(tabsElements, activeClassesList, inactiveClassesList) {
  for (let i = 0; i < tabsElements.length; i++) {
    tabsElements[i].addEventListener("click", () => {
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

// ==> implement Gear logic

var settingsToggle = document.getElementById("settings-toggle");
var settingsSidebar = document.getElementById("settings-sidebar");
var closeSettings = document.getElementById("close-settings");

// ==> implement closure of settings logic
closeSettings.addEventListener("click", () => {
  settingsSidebar.classList.add("translate-x-full");
  settingsToggle.style.right = "0rem";
});

document.body.addEventListener("click", (e) => {
  var isSidebarClosed = settingsSidebar.classList.contains("translate-x-full");
  var isSettingsToggleClicked =
    e.target === settingsToggle || e.target.parentElement === settingsToggle;
  var isClickedInsideSidebar = settingsSidebar.contains(e.target);

  if (!isSidebarClosed && !isSettingsToggleClicked && !isClickedInsideSidebar) {
    settingsSidebar.classList.add("translate-x-full");
    settingsToggle.style.right = "0rem";
  }
});
settingsToggle.addEventListener("click", (e) => {
  console.log("clicked", e.currentTarget);
  e.currentTarget.style.right = "20rem";
  settingsSidebar.classList.remove("translate-x-full");
  e.stopPropagation();
});

function updateThemeColors() {
  // populate colores sections with JS
  var themeColoresGrid = document.getElementById("theme-colors-grid");

  var themeColors = [
    {
      title: "Purple Blue",
      primary: "#6366f1",
      secondary: "#8b5cf6",
    },
    {
      title: "Pink Orange",
      primary: "#ec4899",
      secondary: "#f97316",
    },
    {
      title: "Green Emerald",
      primary: "#10b981",
      secondary: "#059669",
    },
    {
      title: "Blue Cyan",
      primary: "#3b82f6",
      secondary: "#06b6d4",
    },
    {
      title: "Red Rose",
      primary: "#ef4444",
      secondary: "#f43f5e",
    },
    {
      title: "Amber Orange",
      primary: "#f59e0b",
      secondary: "#ea580c",
    },
  ];
  var content = "";
  for (var i = 0; i < themeColors.length; i++) {
    content += `
        <button
                class="w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700 hover:border-primary shadow-sm"
                title="${themeColors[i].title}"
                data-primary="${themeColors[i].primary}"
                data-secondary="${themeColors[i].secondary}"
                style="
                  background: linear-gradient(
                    135deg,
                    ${themeColors[i].primary},
                    ${themeColors[i].secondary}
                  );
                "
              ></button
              >`;
  }

  themeColoresGrid.innerHTML = content;

  // handle active theme color
  var themeColorButtons = document.querySelectorAll(
    "#theme-colors-grid button"
  );
  var defaultPrimaryThemeColor = "#6366f1";
  var defaultSecondaryThemeColor = "#8b5cf6";
  var activeThemeColorClassList = [
    "ring-2",
    "ring-primary",
    "ring-offset-2",
    "ring-offset-white",
    "dark:ring-offset-slate-900",
  ];

  for (let i = 0; i < themeColorButtons.length; i++) {
    if (themeColorButtons[i].dataset.primary === defaultPrimaryThemeColor) {
      themeColorButtons[i].classList.add(...activeThemeColorClassList);
      document.documentElement.style.setProperty(
        "--color-primary",
        defaultPrimaryThemeColor
      );
      document.documentElement.style.setProperty(
        "--color-secondary",
        defaultSecondaryThemeColor
      );
    } else {
      themeColorButtons[i].classList.remove(...activeThemeColorClassList);
    }
    themeColorButtons[i].addEventListener("click", function (e) {
      var primary = e.target.dataset.primary;
      var secondary = e.target.dataset.secondary;
      document.documentElement.style.setProperty("--color-primary", primary);
      document.documentElement.style.setProperty(
        "--color-secondary",
        secondary
      );

      for (let j = 0; j < themeColorButtons.length; j++) {
        themeColorButtons[j].classList.remove(...activeThemeColorClassList);
      }
      e.target.classList.add(...activeThemeColorClassList);
    });
  }
}
updateThemeColors();
// handle fonts
var fontButtons = document.querySelectorAll(".font-option");
var activeFontBtnClasses = [
  "active",
  "border-primary",
  "bg-slate-50",
  "dark:bg-slate-800",
];
var inactiveFontBtnClasses = ["border-slate-200", "dark:border-slate-700"];
var defaultFontFamily = "tajawal";

updateFont();

function updateFont() {
  for (let i = 0; i < fontButtons.length; i++) {
    if (fontButtons[i].dataset.font === defaultFontFamily) {
      fontButtons[i].classList.add(...activeFontBtnClasses);
      fontButtons[i].classList.remove(...inactiveFontBtnClasses);
    } else {
      fontButtons[i].classList.remove(...activeFontBtnClasses);
      fontButtons[i].classList.add(...inactiveFontBtnClasses);
    }

    fontButtons[i].addEventListener("click", function (e) {
      var targetFontFamily = "font-" + fontButtons[i].dataset.font;
      var currentFontFamily =
        document.body.classList.value.match(/font-(\S+)\b/)[0];
      document.body.classList.replace(currentFontFamily, `${targetFontFamily}`);

      for (let j = 0; j < fontButtons.length; j++) {
        fontButtons[j].classList.remove(...activeFontBtnClasses);
        fontButtons[j].classList.add(...inactiveFontBtnClasses);
      }
      fontButtons[i].classList.add(...activeFontBtnClasses);
      fontButtons[i].classList.remove(...inactiveFontBtnClasses);
    });
  }
}

// ==> implement reset settings logic
var resetSettings = document.getElementById("reset-settings");
resetSettings.addEventListener("click", () => {
  updateFont();
  updateThemeColors();
});
