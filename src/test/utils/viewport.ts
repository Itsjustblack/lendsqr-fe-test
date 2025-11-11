/**
 * Utility functions for testing responsive designs
 */

/**
 * Set the viewport size for testing
 */
export function setViewport(width: number, height: number): void {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });

  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  });

  // Trigger resize event
  window.dispatchEvent(new Event('resize'));
}

/**
 * Common viewport sizes for testing
 */
export const viewports = {
  mobile: { width: 375, height: 667 },
  mobileSmall: { width: 320, height: 568 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 900 },
  desktopLarge: { width: 1920, height: 1080 },
} as const;

/**
 * Set viewport to mobile size
 */
export function setMobileViewport(): void {
  setViewport(viewports.mobile.width, viewports.mobile.height);
}

/**
 * Set viewport to tablet size
 */
export function setTabletViewport(): void {
  setViewport(viewports.tablet.width, viewports.tablet.height);
}

/**
 * Set viewport to desktop size
 */
export function setDesktopViewport(): void {
  setViewport(viewports.desktop.width, viewports.desktop.height);
}

/**
 * Reset viewport to default desktop size
 */
export function resetViewport(): void {
  setDesktopViewport();
}
