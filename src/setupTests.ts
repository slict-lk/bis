// Mock browser APIs not available in JSDOM
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = MockResizeObserver;

// Mock for Radix UI components
global.IntersectionObserver = class IntersectionObserver {
  constructor() {
    this.root = null;
    this.rootMargin = '0px';
    this.thresholds = [0];
  }
  
  root: Element | null;
  rootMargin: string;
  thresholds: number[];
  
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
};

// Add other global mocks as needed
global.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
});
