// lib/fpixel.js
export const FB_PIXEL_ID = "309789307068815";

// Standard pageview
export const pageview = () => {
  window.fbq?.("track", "PageView");
};

// Custom event helper
export const event = (name, options = {}) => {
  window.fbq?.("track", name, options);
};
