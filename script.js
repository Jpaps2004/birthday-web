import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

// =========================
// FIREBASE CONFIG
// =========================
const firebaseConfig = {
  apiKey: "AIzaSyBxkDIgrIdjRfqe9jvqwKdYePuOXv1SNfM",
  authDomain: "birthday-letter-29ba8.firebaseapp.com",
  projectId: "birthday-letter-29ba8",
  storageBucket: "birthday-letter-29ba8.firebasestorage.app",
  messagingSenderId: "625626526040",
  appId: "1:625626526040:web:c1a401be0427ae311df52d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// =========================
// MESSAGE SYSTEM (FIXED)
// =========================
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let customMessage = ""; // ❗ FIXED (no default override)

// LOAD FIREBASE MESSAGE FIRST
async function loadMessage() {

  if (id) {

    const snap = await getDoc(doc(db, "letters", id));

    if (snap.exists()) {
      customMessage = snap.data().message;
    }

  }

}

// =========================
// TYPEWRITER (FIXED FLOW)
// =========================
let i = 0;

function typeText() {

  const el = document.getElementById("message");
  if (!el) return;

  if (i === 0) el.innerHTML = "";

  if (i < customMessage.length) {
    el.innerHTML += customMessage.charAt(i);
    i++;
    setTimeout(typeText, 40);
  }

}

// start typing ONLY after message is ready
function startLetter() {
  i = 0;
  typeText();
}

// =========================
// PAGE NAVIGATION
// =========================
window.next = function (id) {

  document.querySelectorAll(".page")
    .forEach(p => p.classList.remove("active"));

  document.getElementById(id)
    .classList.add("active");

};

// =========================
// ENVELOPE + MUSIC (FIXED)
// =========================
window.openEnvelope = function () {

  const envelope = document.querySelector(".envelope");
  const music = document.getElementById("bgMusic");

  envelope.classList.add("open");

  // 🎵 MUSIC
  if (music) {
    music.volume = 0.5;
    music.currentTime = 0;
    music.play().catch(() => {});
  }

  setTimeout(() => {

    document
      .getElementById("letterCard")
      .classList.remove("hidden");

    startLetter(); // ✅ FIXED HERE

  }, 500);

};

// =========================
// GALLERY
// =========================
let index = 0;

window.openGallery = function () {
  document.getElementById("popup").classList.remove("hidden");
};

window.closeGallery = function () {
  document.getElementById("popup").classList.add("hidden");
};

window.slide = function (dir) {

  const slides = document.getElementById("slides");
  const total = slides.children.length;

  index = (index + dir + total) % total;

  slides.style.transform =
    `translateX(-${index * 100}%)`;

};

// =========================
// SWIPE
// =========================
const slides = document.getElementById("slides");

if (slides) {

  let startX = 0;

  slides.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  slides.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) slide(1);
    if (endX - startX > 50) slide(-1);
  });

}

// =========================
// PETALS
// =========================
const petals = document.getElementById("petals");

if (petals) {

  for (let i = 0; i < 25; i++) {

    let p = document.createElement("span");

    p.style.left = Math.random() * 100 + "vw";
    p.style.animationDuration = (5 + Math.random() * 5) + "s";
    p.style.opacity = Math.random();

    petals.appendChild(p);

  }

}

// =========================
// INIT (IMPORTANT FIX)
// =========================
loadMessage();