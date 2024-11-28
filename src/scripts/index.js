// main css
import "../styles/style.css";

document.addEventListener("DOMContentLoaded", () => {
  const backgroundAnimation = document.querySelector(".background-animation");
  const cards = document.querySelectorAll(".card");

  document.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const moveX = ((clientX - centerX) / centerX) * 20;
    const moveY = ((clientY - centerY) / centerY) * 20;

    backgroundAnimation.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });

  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(card);
  });
});
