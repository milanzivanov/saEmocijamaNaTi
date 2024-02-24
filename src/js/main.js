import "../scss/style.scss";

// dinamic height
function setHeaderHeight() {
  const headerHeight = document.querySelector(".header");
  const root = document.querySelector(":root");
  // const root = document.documentElement;

  console.log(headerHeight.offsetHeight);
  // root.style.setProperty(
  //   "--headerHeight",
  //   `${headerHeight.offsetHeight * 1.5}px`
  // );
  root.style.setProperty("--headerHeight", `${headerHeight.offsetHeight}px`);
}

window.addEventListener("resize", setHeaderHeight);
window.addEventListener("DOMContentLoaded", setHeaderHeight);

/////////////////////////////////
// Remove active state from mobile menu with key escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document
      .querySelector(".nav-backdrop-container")
      .classList.remove("active");
    document.querySelector(".nav-toggle-btn").classList.remove("active");
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
