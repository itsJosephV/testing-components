// =============================================================================
// ELEMENT REFERENCES
// =============================================================================
interface HeaderElements {
  mainHeader: HTMLElement;
  menuBtn: HTMLElement;
  mobileNav: HTMLElement;
  navLinks: NodeListOf<HTMLElement>;
}

function getElements(): HeaderElements | null {
  const mainHeader = document.getElementById("mainHeader");
  const menuBtn = document.getElementById("menuBtn");
  const mobileNav = document.getElementById("mobileNav");

  // Bail out early if any required element is missing
  if (!mainHeader || !menuBtn || !mobileNav) {
    console.warn("Header: required elements not found.");
    return null;
  }

  return {
    mainHeader,
    menuBtn,
    mobileNav,
    navLinks: mobileNav.querySelectorAll("a"),
  };
}

// =============================================================================
// SCROLL-TO-HIDE HEADER LOGIC
// =============================================================================
const SCROLL_THRESHOLD = 50;
const SCROLL_TOP_BUFFER = 75;

function createScrollHandler(mainHeader: HTMLElement, isNavOpen: () => boolean) {
  let lastScrollY = window.scrollY;

  return function handleHeaderScroll() {
    if (isNavOpen()) return;

    const currentScrollY = window.scrollY;
    const scrollDelta = Math.abs(currentScrollY - lastScrollY);

    if (scrollDelta < SCROLL_THRESHOLD) return;

    const isScrollingDown = currentScrollY > lastScrollY && currentScrollY > SCROLL_TOP_BUFFER;
    mainHeader.classList.toggle("-translate-y-full", isScrollingDown);

    lastScrollY = currentScrollY;
  };
}

// =============================================================================
// MOBILE NAV STATE HELPERS
// =============================================================================
function createNavHelpers(mainHeader: HTMLElement, mobileNav: HTMLElement) {
  const isNavOpen = () => !mobileNav.classList.contains("hidden");

  function syncNavHeight() {
    const headerBottom = mainHeader.getBoundingClientRect().bottom;
    mobileNav.style.height = `calc(100dvh - ${headerBottom}px)`;
  }

  return { isNavOpen, syncNavHeight };
}

// =============================================================================
// OPEN / CLOSE NAV
// =============================================================================
function createNavControls(
  mainHeader: HTMLElement,
  menuBtn: HTMLElement,
  mobileNav: HTMLElement,
  syncNavHeight: () => void,
  addListeners: () => void,
  removeListeners: () => void,
) {
  function openNav() {
    mainHeader.classList.remove("-translate-y-full");
    syncNavHeight();

    mobileNav.style.display = "block";
    mobileNav.classList.remove("hidden");

    requestAnimationFrame(() => {
      mobileNav.classList.remove("translate-x-full");
      menuBtn.classList.add("active");
      document.body.style.overflow = "hidden";
    });

    addListeners();
  }

  function closeNav() {
    document.body.style.overflow = "";
    menuBtn.classList.remove("active");
    mobileNav.classList.add("translate-x-full");

    mobileNav.addEventListener("transitionend", onNavTransitionEnd, { once: true });

    removeListeners();
  }

  function onNavTransitionEnd() {
    if (mobileNav.classList.contains("translate-x-full")) {
      mobileNav.style.display = "none";
      mobileNav.classList.add("hidden");
    }
  }

  return { openNav, closeNav };
}

// =============================================================================
// EVENT LISTENERS
// =============================================================================
function createEventListeners(
  mobileNav: HTMLElement,
  menuBtn: HTMLElement,
  closeNav: () => void,
  syncNavHeight: () => void,
) {
  function handleOutsideInteraction(e: Event) {
    if (!mobileNav.contains(e.target as Node) && !menuBtn.contains(e.target as Node)) {
      closeNav();
    }
  }

  function handleEscapeKey(e: KeyboardEvent) {
    if (e.key === "Escape") closeNav();
  }

  function handleResize() {
    if (window.innerWidth >= 768) closeNav();
  }

  function addNavEventListeners() {
    document.addEventListener("click", handleOutsideInteraction);
    document.addEventListener("touchstart", handleOutsideInteraction);
    document.addEventListener("keydown", handleEscapeKey);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", syncNavHeight);
  }

  function removeNavEventListeners() {
    document.removeEventListener("click", handleOutsideInteraction);
    document.removeEventListener("touchstart", handleOutsideInteraction);
    document.removeEventListener("keydown", handleEscapeKey);
    window.removeEventListener("resize", handleResize);
    window.removeEventListener("scroll", syncNavHeight);
  }

  return { addNavEventListeners, removeNavEventListeners };
}

// =============================================================================
// INIT — single public export
// =============================================================================
export function initHeader() {
  const elements = getElements();
  if (!elements) return;

  const { mainHeader, menuBtn, mobileNav, navLinks } = elements;

  const { isNavOpen, syncNavHeight } = createNavHelpers(mainHeader, mobileNav);

  const { addNavEventListeners, removeNavEventListeners } = createEventListeners(
    mobileNav, menuBtn,
    () => closeNav(),   // forward reference
    syncNavHeight,
  );

  const { openNav, closeNav } = createNavControls(
    mainHeader, menuBtn, mobileNav,
    syncNavHeight,
    addNavEventListeners,
    removeNavEventListeners,
  );

  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    isNavOpen() ? closeNav() : openNav();
  });

  navLinks.forEach((link) => link.addEventListener("click", closeNav));

  window.addEventListener("scroll", createScrollHandler(mainHeader, isNavOpen));
}