import "@testing-library/jest-dom/vitest";

// Polyfill matchMedia for useReducedMotion
if (!window.matchMedia) {
  // @ts-ignore
  window.matchMedia = () => ({
    matches: false,
    media: "",
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

// Polyfill IntersectionObserver used by framer-motion viewport
if (!("IntersectionObserver" in window)) {
  // @ts-ignore
  window.IntersectionObserver = class {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() { return []; }
  } as any;
}


