// One-Page Website Lightbox (Modal Image Gallery)

const thumbs = Array.from(document.querySelectorAll(".lb-thumb"));

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");

const btnClose = document.getElementById("lightboxClose");
const btnPrev = document.getElementById("lightboxPrev");
const btnNext = document.getElementById("lightboxNext");

let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;

  const thumb = thumbs[currentIndex];
  const fullSrc = thumb.getAttribute("data-full") || thumb.src;

  lightboxImg.src = fullSrc;
  lightboxImg.alt = thumb.alt || "";
  lightboxCaption.textContent = thumb.alt || "";

  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
}

function showPrev() {
  currentIndex = (currentIndex - 1 + thumbs.length) % thumbs.length;
  openLightbox(currentIndex);
}

function showNext() {
  currentIndex = (currentIndex + 1) % thumbs.length;
  openLightbox(currentIndex);
}

// Click thumbnail opens lightbox
thumbs.forEach((thumb, index) => {
  thumb.addEventListener("click", () => openLightbox(index));
});

// Buttons
btnClose.addEventListener("click", closeLightbox);
btnPrev.addEventListener("click", showPrev);
btnNext.addEventListener("click", showNext);

// Click outside image closes
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;

  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") showPrev();
  if (e.key === "ArrowRight") showNext();
});
