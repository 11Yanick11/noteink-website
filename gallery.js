// Arrow buttons for the picture strip. Without this script the strip still scrolls by swiping.
for (const gallery of document.querySelectorAll(".gallery")) {
  const strip = gallery.querySelector(".strip");
  const prev = gallery.querySelector(".prev");
  const next = gallery.querySelector(".next");

  const step = () => strip.firstElementChild.getBoundingClientRect().width + parseFloat(getComputedStyle(strip).columnGap);
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const move = (direction) => strip.scrollBy({ left: direction * step(), behavior: reduceMotion ? "auto" : "smooth" });

  const update = () => {
    prev.disabled = strip.scrollLeft < 4;
    next.disabled = strip.scrollLeft > strip.scrollWidth - strip.clientWidth - 4;
  };

  prev.addEventListener("click", () => move(-1));
  next.addEventListener("click", () => move(1));
  strip.addEventListener("scroll", update, { passive: true });
  prev.hidden = next.hidden = false;
  update();
}
