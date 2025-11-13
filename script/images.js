const imgGallery = document.querySelector(".gallery-grid");

let imgHtml = "";
images.forEach((imgUrl) => {
  imgHtml += `<img class="img-gallery" src="database/images/${imgUrl}">`;
});

imgGallery.innerHTML = imgHtml;


const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

let scale = 1;
let posX = 0;
let posY = 0;
let startX = 0;
let startY = 0;
let isDragging = false;

// Open lightbox
document.querySelectorAll(".gallery-grid img").forEach((img) => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    scale = 1;
    posX = 0;
    posY = 0;
    updateTransform();
  });
});

// Close lightbox
document.getElementById("close").addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Close by clicking outside image
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.style.display = "none";
});

// Update transform
function updateTransform() {
  lightboxImg.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
}

// Drag with mouse
lightboxImg.addEventListener("mousedown", (e) => {
  if (scale <= 1) return;
  isDragging = true;
  startX = e.clientX - posX;
  startY = e.clientY - posY;
  lightboxImg.style.cursor = "grabbing";
});

window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  posX = e.clientX - startX;
  posY = e.clientY - startY;
  updateTransform();
});

window.addEventListener("mouseup", () => {
  isDragging = false;
  lightboxImg.style.cursor = "grab";
});

// Scroll wheel zoom for desktop
lightboxImg.addEventListener("wheel", (e) => {
  e.preventDefault();
  const delta = e.deltaY > 0 ? -0.1 : 0.1;
  scale = Math.max(1, scale + delta);
  updateTransform();
});

// Touch drag & pinch
let initialDistance = 0;
let initialScale = 1;

lightboxImg.addEventListener("touchstart", (e) => {
  if (e.touches.length === 1) {
    startX = e.touches[0].clientX - posX;
    startY = e.touches[0].clientY - posY;
  } else if (e.touches.length === 2) {
    initialDistance = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );
    initialScale = scale;
  }
});

lightboxImg.addEventListener("touchmove", (e) => {
  e.preventDefault();
  if (e.touches.length === 1 && scale > 1) {
    posX = e.touches[0].clientX - startX;
    posY = e.touches[0].clientY - startY;
  } else if (e.touches.length === 2) {
    const distance = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );
    scale = Math.max(1, initialScale * (distance / initialDistance));
  }
  updateTransform();
});
