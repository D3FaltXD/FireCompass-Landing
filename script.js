// myjs.js

window.onload = function () {
  // Clear everything in the body
  document.body.innerHTML = "";

  // Set body and html styles for fullscreen
  document.body.style.margin = "0";
  document.body.style.padding = "0";
  document.body.style.overflow = "hidden";
  document.documentElement.style.margin = "0";
  document.documentElement.style.padding = "0";

  // Create video element
  const video = document.createElement("video");
  video.src = "video.mp4"; // make sure video.mp4 is in the same directory
  video.autoplay = true;
  video.loop = true;
  video.muted = true; // Required for autoplay in most browsers
  
  // Fullscreen video styles
  video.style.position = "fixed";
  video.style.top = "0";
  video.style.left = "0";
  video.style.width = "100vw";
  video.style.height = "100vh";
  video.style.objectFit = "cover"; // Ensures video covers entire screen while maintaining aspect ratio
  video.style.zIndex = "-1"; // Places video behind any other content
  
  document.body.appendChild(video);
};
