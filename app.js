const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const contactBtn = document.getElementById("contact-btn");
const contactSection = document.getElementById("contact");
if (contactBtn && contactSection) {
  contactBtn.addEventListener("click", function () {
    contactSection.scrollIntoView({ behavior: "smooth" });
  });
}

document.querySelectorAll('.lien a[href^="#"]').forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const nomInput = document.getElementById("nom");
    const nom = nomInput ? nomInput.value.trim() : "";
    alert(
      "Merci " +
        (nom || "pour ton message") +
        " ! Ton message est enregistré. Tu pourras connecter ce formulaire plus tard à un vrai back-end."
    );
    contactForm.reset();
  });
}

const animatedBlocks = document.querySelectorAll(".animate-on-scroll");
if ("IntersectionObserver" in window && animatedBlocks.length > 0) {
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );
  animatedBlocks.forEach(function (block) {
    observer.observe(block);
  });
} else {
  animatedBlocks.forEach(function (block) {
    block.classList.add("in-view");
  });
}
