import "@testing-library/jest-dom/vitest";

// Polyfill matchMedia for useReducedMotion
if (!window.matchMedia) {
  // Casting shim for jsdom
  (window as unknown as { matchMedia: () => MediaQueryList }).matchMedia = () => ({
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
  // Casting shim for jsdom
  // @ts-expect-error jsdom shim
  window.IntersectionObserver = class {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() { return []; }
  } as any;
}


