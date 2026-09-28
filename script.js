const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
  mobileNav.hidden = isOpen;
});
mobileNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mobileNav.hidden = true;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open menu");
}));

const slides = [
  { location: "Cappadocia, Türkiye  •  38°38′ N", first: "Go a little", emphasis: "further.", description: "Let the extraordinary find you somewhere between the sunrise and the road ahead.", name: "Cappadocia" },
  { location: "The Swiss Alps  •  46°41′ N", first: "Find your", emphasis: "quiet.", description: "Slow down where the mountains meet the water and every view asks you to stay.", name: "The Swiss Alps" },
  { location: "The Andaman Coast, Thailand  •  08°03′ N", first: "Follow the", emphasis: "water.", description: "Trade the usual route for open horizons, warm seas, and the freedom to drift.", name: "Thailand" }
];
const hero = document.querySelector(".hero");
const heroImages = [...document.querySelectorAll(".hero-slide")];
const progressButtons = [...document.querySelectorAll(".progress-segment")];
const heroTitle = document.querySelector("#hero-title");
const heroLocation = document.querySelector("#hero-location");
const heroDescription = document.querySelector("#hero-description");
const heroIndex = document.querySelector("#hero-index");
const announcement = document.querySelector("#hero-announcement");
const pauseButton = document.querySelector("#hero-pause");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let activeSlide = 0;
let userPaused = reducedMotion.matches;
let timer;

function showSlide(next, announce = false) {
  activeSlide = (next + slides.length) % slides.length;
  const slide = slides[activeSlide];
  heroImages.forEach((image, index) => image.classList.toggle("is-active", index === activeSlide));
  progressButtons.forEach((button, index) => {
    button.classList.toggle("is-active", index === activeSlide);
    if (index === activeSlide) button.setAttribute("aria-current", "true");
    else button.removeAttribute("aria-current");
  });
  const emphasis = document.createElement("em");
  emphasis.textContent = slide.emphasis;
  heroTitle.replaceChildren(document.createTextNode(slide.first + " "), emphasis);
  heroLocation.textContent = slide.location;
  heroDescription.textContent = slide.description;
  heroIndex.textContent = String(activeSlide + 1).padStart(2, "0");
  if (announce) announcement.textContent = "Showing " + slide.name;
}
function stopTimer() {
  window.clearInterval(timer);
  timer = undefined;
}
function startTimer() {
  stopTimer();
  if (userPaused || reducedMotion.matches || document.hidden || hero.matches(":hover") || hero.contains(document.activeElement)) return;
  timer = window.setInterval(() => showSlide(activeSlide + 1), 6500);
}
function setPauseButton() {
  pauseButton.setAttribute("aria-label", userPaused ? "Play slideshow" : "Pause slideshow");
  pauseButton.textContent = userPaused ? "▶" : "Ⅱ";
}
document.querySelector("#hero-prev").addEventListener("click", () => { showSlide(activeSlide - 1, true); startTimer(); });
document.querySelector("#hero-next").addEventListener("click", () => { showSlide(activeSlide + 1, true); startTimer(); });
progressButtons.forEach(button => button.addEventListener("click", () => {
  showSlide(Number(button.dataset.slide), true);
  startTimer();
}));
pauseButton.addEventListener("click", () => {
  userPaused = !userPaused;
  setPauseButton();
  startTimer();
});
hero.addEventListener("mouseenter", stopTimer);
hero.addEventListener("mouseleave", startTimer);
hero.addEventListener("focusin", stopTimer);
hero.addEventListener("focusout", event => { if (!hero.contains(event.relatedTarget)) startTimer(); });
document.addEventListener("visibilitychange", startTimer);
reducedMotion.addEventListener("change", () => { if (reducedMotion.matches) userPaused = true; setPauseButton(); startTimer(); });
setPauseButton();
startTimer();

const tripForm = document.querySelector("#trip-form");
const destinationSelect = tripForm.elements.destination;
document.querySelectorAll(".destination-card").forEach(card => card.addEventListener("click", () => {
  destinationSelect.value = card.dataset.destination;
}));
let latestBrief = "";
tripForm.addEventListener("submit", event => {
  event.preventDefault();
  if (!tripForm.reportValidity()) return;
  const data = new FormData(tripForm);
  const destination = String(data.get("destination") || "").trim();
  const style = String(data.get("style") || "").trim();
  const dates = String(data.get("dates") || "").trim();
  const travellers = String(data.get("travellers") || "").trim();
  const notes = String(data.get("notes") || "").trim();
  latestBrief = [
    "MY TRIP BRIEF",
    "Destination: " + destination,
    "Travel style: " + style,
    dates && "When: " + dates,
    "Travellers: " + travellers,
    notes && "What matters most: " + notes
  ].filter(Boolean).join("\n");
  document.querySelector("#brief-text").textContent = latestBrief;
  document.querySelector("#brief-result").hidden = false;
  document.querySelector("#copy-status").textContent = "";
  document.querySelector("#brief-result").scrollIntoView({ behavior: reducedMotion.matches ? "instant" : "smooth", block: "nearest" });
});
document.querySelector("#copy-brief").addEventListener("click", async () => {
  const status = document.querySelector("#copy-status");
  try {
    await navigator.clipboard.writeText(latestBrief);
    status.textContent = "Copied. Your trip brief is ready to share.";
  } catch {
    status.textContent = "Copy is unavailable here. Select the brief above to copy it.";
  }
});
