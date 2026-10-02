(function () {
  "use strict";

  /* ======================================================
     CONFIGURATION — edit these to update contact details
     ====================================================== */
  const WHATSAPP_NUMBER = "256776810095"; // no "+" or spaces
  const WHATSAPP_DEFAULT_MESSAGE = "Hello Freetown Resort-Gulu, I would like to inquire about room availability and current rates.";

  const SOCIAL_LINKS = {
    facebook: "",
    instagram: "",
    tiktok: "https://vm.tiktok.com/ZS9D6Dr1HGLaJ-tsKfD/",
    youtube: ""
  };

  /* ---------- Apply WhatsApp links everywhere ---------- */
  function waUrl(message) {
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  }
  var defaultWaUrl = waUrl(WHATSAPP_DEFAULT_MESSAGE);
  ["ctaWhatsapp", "locationWhatsapp", "contactCardWhatsapp", "footerWhatsapp", "fabWhatsapp"].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.href = defaultWaUrl;
  });

  /* ---------- Apply / hide social links ---------- */
  Object.keys(SOCIAL_LINKS).forEach(function (key) {
    var url = SOCIAL_LINKS[key];
    var iconLink = document.getElementById("social-" + key);
    var footerItem = document.getElementById("footer-" + key);
    if (url) {
      if (iconLink) { iconLink.href = url; iconLink.hidden = false; }
      if (footerItem) { footerItem.hidden = false; var a = footerItem.querySelector("a"); if (a) a.href = url; }
    } else {
      if (iconLink) iconLink.hidden = true;
      if (footerItem) footerItem.hidden = true;
    }
  });

  /* ---------- Sticky nav ---------- */
  var nav = document.getElementById("siteNav");
  function onScroll() {
    if (window.scrollY > 40) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  function setMenu(open) {
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }
  toggle.addEventListener("click", function (e) {
    e.stopPropagation();
    setMenu(!document.body.classList.contains("menu-open"));
  });
  navLinks.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { setMenu(false); });
  });
  document.addEventListener("click", function (e) {
    if (document.body.classList.contains("menu-open") && !navLinks.contains(e.target) && e.target !== toggle) {
      setMenu(false);
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && document.body.classList.contains("menu-open")) setMenu(false);
  });

  /* ---------- Scroll reveal ---------- */
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");
  if (!prefersReduced && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Gallery filters ---------- */
  var chips = document.querySelectorAll(".filter-chip");
  var items = document.querySelectorAll(".gallery-item");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (c) { c.classList.remove("is-active"); });
      chip.classList.add("is-active");
      var filter = chip.dataset.filter;
      items.forEach(function (item) {
        item.hidden = !(filter === "all" || item.dataset.cat === filter);
      });
    });
  });

  /* ---------- Lightbox with keyboard + prev/next ---------- */
  var galleryItems = Array.prototype.slice.call(items);
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxCaption = document.getElementById("lightboxCaption");
  var lightboxClose = document.getElementById("lightboxClose");
  var lightboxPrev = document.getElementById("lightboxPrev");
  var lightboxNext = document.getElementById("lightboxNext");
  var currentIndex = 0;

  function visibleItems() {
    return galleryItems.filter(function (item) { return !item.hidden; });
  }

  function openLightboxAt(index) {
    var visible = visibleItems();
    if (!visible.length) return;
    currentIndex = (index + visible.length) % visible.length;
    var item = visible[currentIndex];
    var img = item.querySelector("img");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = img.alt;
    lightbox.classList.add("is-open");
    lightboxClose.focus();
  }
  function closeLightbox() { lightbox.classList.remove("is-open"); }

  galleryItems.forEach(function (item, idx) {
    item.addEventListener("click", function () {
      var visible = visibleItems();
      openLightboxAt(visible.indexOf(item));
    });
  });
  lightboxClose.addEventListener("click", closeLightbox);
  lightboxPrev.addEventListener("click", function () { openLightboxAt(currentIndex - 1); });
  lightboxNext.addEventListener("click", function () { openLightboxAt(currentIndex + 1); });
  lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") openLightboxAt(currentIndex - 1);
    if (e.key === "ArrowRight") openLightboxAt(currentIndex + 1);
  });

  /* ---------- Booking form -> WhatsApp ---------- */
  var form = document.getElementById("bookingForm");
  var formConfirm = document.getElementById("formConfirm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("fName").value.trim();
    var phone = document.getElementById("fPhone").value.trim();
    var checkin = document.getElementById("fCheckin").value;
    var checkout = document.getElementById("fCheckout").value;
    var guests = document.getElementById("fGuests").value.trim();
    var message = document.getElementById("fMessage").value.trim();

    if (!name || !phone) {
      alert("Please enter your name and phone number.");
      return;
    }

    var text = "Hello Freetown Resort-Gulu, my name is " + name + ". I would like to inquire about accommodation.";
    if (checkin) text += " Check-in: " + checkin + ".";
    if (checkout) text += " Check-out: " + checkout + ".";
    if (guests) text += " Guests: " + guests + ".";
    if (message) text += " Message: " + message + ".";
    text += " Phone: " + phone + ".";

    formConfirm.classList.add("is-visible");
    setTimeout(function () {
      window.open(waUrl(text), "_blank", "noopener");
    }, 600);
  });
})();
