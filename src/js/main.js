import "../scss/style.scss";

// dinamic height
function setHeaderHeight() {
  const headerHeight = document.querySelector(".header");
  const root = document.querySelector(":root");

  root.style.setProperty("--headerHeight", `${headerHeight.offsetHeight}px`);
}

window.addEventListener("resize", setHeaderHeight);
window.addEventListener("DOMContentLoaded", setHeaderHeight);

////////////
// mobile menu
let toggleBtn = document.querySelector(".nav-container__btn");
let mobileNavigation = document.querySelector(".nav-container-mobile");
// let backdrop = document.querySelector(".nav-backdrop-container");

toggleBtn.addEventListener("click", function () {
  toggleBtn.classList.add("active");
  mobileNavigation.classList.add("active");
});

mobileNavigation.addEventListener("click", function () {
  toggleBtn.classList.remove("active");
  mobileNavigation.classList.remove("active");
});

/////////////////////////////////
// Remove active state from mobile menu with key escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelector(".nav-container-mobile").classList.remove("active");
  }
});

///////////////
/// btt new
document.addEventListener("scroll", handleScroll);
// get a reference to the button
let scrollToTopBtn = document.querySelector(".back-to-top-container");

function handleScroll() {
  let scrolableHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let GOLDEN_RATIO = 0.09;

  if (document.documentElement.scrollTop / scrolableHeight > GOLDEN_RATIO) {
    scrollToTopBtn.style.display = "flex";
  } else {
    scrollToTopBtn.style.display = "none";
  }
}

scrollToTopBtn.addEventListener("click", scrollToTop);

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

//////////////////////
// StickyNav
const header = document.querySelector(".header");
const main = document.querySelector(".main");
const headerHeight = header.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`
});

headerObserver.observe(main);

/////////////////////////////
// Scroll to section with event delagation better approach
document.querySelector(".nav-list").addEventListener("click", function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains("nav-list__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

///////////////////////
// lazy loading with intersectionObserver
const images = document.querySelectorAll("img[data-src]");

function preloadImage(img) {
  const src = img.getAttribute("data-src");
  if (!src) {
    return;
  }
  img.src = src;
}
const imgOptions = {
  threshold: 0,
  rootMargin: "0px 0px 200px 0px"
};
const imgObserver = new IntersectionObserver((entries, imgObserver) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      preloadImage(entry.target);
      imgObserver.unobserve(entry.target);
    }
  });
}, imgOptions);

images.forEach((image) => {
  imgObserver.observe(image);
});

//////////////////////////
// Fade items into view while scrolling
const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("appear");
      appearOnScroll.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach((fader) => {
  appearOnScroll.observe(fader);
});
