// E-Mail-Adresse, an die das Kontaktformular gesendet wird
const CONTACT_EMAIL = "kontakt@example.com";

document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  setupFilters();
  setupLightbox();
  setupReveal();
  setupContactForm();
  document.getElementById("year").textContent = new Date().getFullYear();
});

function setupNavigation() {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");

  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const setOpen = (open) => {
    links.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  };
  toggle.addEventListener("click", () => setOpen(!links.classList.contains("is-open")));
  links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
}

function setupFilters() {
  const buttons = document.querySelectorAll(".filter");
  const works = document.querySelectorAll(".work");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const filter = btn.dataset.filter;
      works.forEach((work) => {
        const show = filter === "alle" || work.dataset.category === filter;
        work.classList.toggle("is-hidden", !show);
      });
    });
  });
}

function setupLightbox() {
  const lightbox = document.getElementById("lightbox");
  const media = document.getElementById("lbMedia");
  const caption = document.getElementById("lbCaption");
  const works = Array.from(document.querySelectorAll(".work"));
  let current = 0;

  const visibleWorks = () => works.filter((w) => !w.classList.contains("is-hidden"));

  const show = (work) => {
    const list = visibleWorks();
    current = list.indexOf(work);
    const visual = work.querySelector("img, .art");
    media.innerHTML = "";
    media.appendChild(visual.cloneNode(true));
    caption.innerHTML = work.querySelector("figcaption").innerHTML;
  };

  const open = (work) => {
    show(work);
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  const step = (dir) => {
    const list = visibleWorks();
    show(list[(current + dir + list.length) % list.length]);
  };

  works.forEach((work) => {
    work.tabIndex = 0;
    work.addEventListener("click", () => open(work));
    work.addEventListener("keydown", (e) => {
      if (e.key === "Enter") open(work);
    });
  });

  document.getElementById("lbClose").addEventListener("click", close);
  document.getElementById("lbPrev").addEventListener("click", () => step(-1));
  document.getElementById("lbNext").addEventListener("click", () => step(1));
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
}

function setupReveal() {
  const targets = document.querySelectorAll(".section__head, .work, .about__portrait, .about__text, .timeline li, .form");
  targets.forEach((el) => el.classList.add("reveal"));

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach((el) => observer.observe(el));
}

// Öffnet das E-Mail-Programm mit vorausgefüllter Nachricht (kein Server nötig)
function setupContactForm() {
  const form = document.getElementById("contactForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(`Anfrage über das Portfolio von ${data.get("name")}`);
    const body = encodeURIComponent(`${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  });
}
