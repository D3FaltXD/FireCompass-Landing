// myjs.js

window.onload = function () {
  // Clear everything in the body
  document.body.innerHTML = "";

  // Create big heading
  const heading = document.createElement("h1");
  heading.innerText = "YOU HAVE BEEN HACKED";
  heading.style.color = "red";
  heading.style.fontSize = "60px";
  heading.style.textAlign = "center";
  document.body.appendChild(heading);

  // Create video element
  const video = document.createElement("video");
  video.src = "video.mp4"; // make sure video.mp4 is in the same directory
  video.autoplay = true;
  video.loop = true;
  video.style.display = "block";
  video.style.margin = "20px auto";
  video.style.maxWidth = "80%";
  document.body.appendChild(video);
};
