

'use strict';



const menuItems = [
  {
    id: 1,
    name: 'Single-Origin Pour Over',
    category: 'coffee',
    price: 5.50,
    description: 'Bright and floral. Sourced from Ethiopian highlands, slow-dripped to perfection.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=75',
    featured: true,
  },
  {
    id: 2,
    name: 'Ember Latte',
    category: 'coffee',
    price: 6.00,
    description: 'Our signature — espresso, oat milk, a touch of cinnamon and brown sugar syrup.',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=75',
    featured: true,
  },
  {
    id: 3,
    name: 'Cold Brew Tonic',
    category: 'coffee',
    price: 6.50,
    description: '18-hour cold brew over tonic water with a slice of orange. Refreshingly bold.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&q=75',
    featured: false,
  },
  {
    id: 4,
    name: 'Almond Croissant',
    category: 'pastry',
    price: 4.25,
    description: 'Buttery, flaky, filled with house-made almond cream and toasted flakes.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=75',
    featured: true,
  },
  {
    id: 5,
    name: 'Seasonal Galette',
    category: 'pastry',
    price: 4.75,
    description: 'Rustic open-faced tart with rotating seasonal fruit. Ask your server for today\'s flavour.',
    image: 'https://images.unsplash.com/photo-1591538010452-b92e0dbd6135?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    featured: false,
  },
  {
    id: 6,
    name: 'Avocado Toast',
    category: 'food',
    price: 11.00,
    description: 'Sourdough, smashed avo, chilli flakes, lemon zest, microgreens, and a poached egg.',
    image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=600&q=75',
    featured: true,
  },
  {
    id: 7,
    name: 'Smoked Salmon Bagel',
    category: 'food',
    price: 13.50,
    description: 'Everything bagel, cream cheese, smoked salmon, capers, red onion, dill.',
    image: 'https://images.unsplash.com/photo-1585325701956-60dd9c8553bc?w=600&q=75',
    featured: false,
  },
  {
    id: 8,
    name: 'Grain Bowl',
    category: 'food',
    price: 14.00,
    description: 'Farro, roasted sweet potato, kale, tahini, pomegranate seeds. Vegan and filling.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=75',
    featured: false,
  },
  {
    id: 9,
    name: 'Hibiscus Lemonade',
    category: 'drink',
    price: 5.00,
    description: 'House-brewed hibiscus tea blended with fresh lemon juice and cane sugar.',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=75',
    featured: false,
  },
  {
    id: 10,
    name: 'Mango Lassi',
    category: 'drink',
    price: 5.50,
    description: 'Alphonso mango, yoghurt, cardamom, and a pinch of sea salt.',
    image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&q=75',
    featured: false,
  },
];

const hoursData = [
  { day: 'Monday',    open: '07:00', close: '21:00' },
  { day: 'Tuesday',   open: '07:00', close: '21:00' },
  { day: 'Wednesday', open: '07:00', close: '21:00' },
  { day: 'Thursday',  open: '07:00', close: '21:00' },
  { day: 'Friday',    open: '07:00', close: '21:00' },
  { day: 'Saturday',  open: '08:00', close: '22:00' },
  { day: 'Sunday',    open: '08:00', close: '22:00' },
];

const testimonials = [
  {
    text: 'The Ember Latte is the best coffee I\'ve had outside of Italy. This place is a hidden gem in Greenfield City.',
    author: 'Aisha M.',
    stars: 5,
  },
  {
    text: 'I come here every Saturday morning. The almond croissants are still warm when I arrive. Absolute heaven.',
    author: 'Tom R.',
    stars: 5,
  },
  {
    text: 'Beautiful space, warm staff, and the grain bowl kept me full all afternoon. Will be back weekly.',
    author: 'Priya N.',
    stars: 5,
  },
  {
    text: 'Reserved a table for our anniversary — they brought a little flower with dessert. The details make it special.',
    author: 'Carlos & Lucia V.',
    stars: 5,
  },
];

/* ══════════════════════════════════════════════
   UTILITY FUNCTIONS
══════════════════════════════════════════════ */

/**
 * Format price as a currency string using template literal
 * @param {number} price
 * @returns {string}
 */
function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

/**
 * Build star string from a numeric rating
 * @param {number} count
 * @returns {string}
 */
function buildStars(count) {
  return Array.from({ length: count }, () => '★').join('');
}

/**
 * Get today's day index (0 = Monday in our array)
 * @returns {number}
 */
function getTodayIndex() {
  const jsDay = new Date().getDay(); // 0 = Sunday
  return jsDay === 0 ? 6 : jsDay - 1;
}

/**
 * Check if café is currently open
 * @param {string} open  - e.g. "07:00"
 * @param {string} close - e.g. "21:00"
 * @returns {boolean}
 */
function isCafeOpen(open, close) {
  const now = new Date();
  const [openH, openM] = open.split(':').map(Number);
  const [closeH, closeM] = close.split(':').map(Number);
  const nowMins = now.getHours() * 60 + now.getMinutes();
  const openMins = openH * 60 + openM;
  const closeMins = closeH * 60 + closeM;
  return nowMins >= openMins && nowMins < closeMins;
}

/* ══════════════════════════════════════════════
   LOCAL STORAGE HELPERS
══════════════════════════════════════════════ */

const LS_FAVS_KEY = 'emberSalt_favourites';
const LS_RESERVATION_KEY = 'emberSalt_lastReservation';

function getFavourites() {
  const raw = localStorage.getItem(LS_FAVS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveFavourites(ids) {
  localStorage.setItem(LS_FAVS_KEY, JSON.stringify(ids));
}

function toggleFavourite(id) {
  const favs = getFavourites();
  const idx = favs.indexOf(id);
  if (idx === -1) {
    favs.push(id);
  } else {
    favs.splice(idx, 1);
  }
  saveFavourites(favs);
  return favs;
}

function saveReservation(data) {
  localStorage.setItem(LS_RESERVATION_KEY, JSON.stringify(data));
}

function getLastReservation() {
  const raw = localStorage.getItem(LS_RESERVATION_KEY);
  return raw ? JSON.parse(raw) : null;
}

function clearReservation() {
  localStorage.removeItem(LS_RESERVATION_KEY);
}

/* ══════════════════════════════════════════════
   NAVIGATION
══════════════════════════════════════════════ */

function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    nav.classList.toggle('open', !isOpen);
  });

  // Close nav when a link is clicked (mobile)
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
    });
  });
}

/* ══════════════════════════════════════════════
   FOOTER YEAR
══════════════════════════════════════════════ */

function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ══════════════════════════════════════════════
   HOURS TABLE (index.html)
══════════════════════════════════════════════ */

function renderHoursTable() {
  const tbody = document.getElementById('hours-body');
  if (!tbody) return;

  const todayIdx = getTodayIndex();

  const rows = hoursData.map((h, i) => {
    const open = isCafeOpen(h.open, h.close);
    const isToday = i === todayIdx;

    const statusText = isToday
      ? (open ? 'Open now' : 'Closed now')
      : '';

    const statusClass = open ? 'status-open' : 'status-closed';
    const rowClass = isToday ? 'today-row' : '';

    return `
      <tr class="${rowClass}">
        <td>${h.day}${isToday ? ' <strong>(today)</strong>' : ''}</td>
        <td>${h.open} – ${h.close}</td>
        <td class="${isToday ? statusClass : ''}">${statusText}</td>
      </tr>`;
  });

  tbody.innerHTML = rows.join('');
}

/* ══════════════════════════════════════════════
   FEATURED CARDS (index.html)
══════════════════════════════════════════════ */

function renderFeaturedItems() {
  const grid = document.getElementById('featured-grid');
  if (!grid) return;

  const featured = menuItems.filter(item => item.featured);

  const cards = featured.map(item => `
    <article class="featured-card">
      <img
        src="${item.image}"
        alt="${item.name}"
        width="600"
        height="400"
        loading="lazy"
      />
      <div class="card-body">
        <p class="card-tag">${item.category}</p>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <span class="card-price">${formatPrice(item.price)}</span>
      </div>
    </article>`);

  grid.innerHTML = cards.join('');
}

/* ══════════════════════════════════════════════
   TESTIMONIALS SLIDER (index.html)
══════════════════════════════════════════════ */

let currentTestimonial = 0;

function renderTestimonials() {
  const track = document.getElementById('testimonials-track');
  const dotsContainer = document.getElementById('t-dots');
  if (!track || !dotsContainer) return;

  const cards = testimonials.map((t, i) => `
    <div class="testimonial-card ${i === 0 ? 'active' : ''}" role="tabpanel" aria-label="Testimonial ${i + 1}">
      <p class="testimonial-stars">${buildStars(t.stars)}</p>
      <p class="testimonial-text">"${t.text}"</p>
      <p class="testimonial-author">— ${t.author}</p>
    </div>`);

  track.innerHTML = cards.join('');

  const dots = testimonials.map((_, i) => `
    <button
      class="t-dot ${i === 0 ? 'active' : ''}"
      role="tab"
      aria-selected="${i === 0}"
      aria-label="Go to testimonial ${i + 1}"
      data-index="${i}"
    ></button>`);

  dotsContainer.innerHTML = dots.join('');

  dotsContainer.querySelectorAll('.t-dot').forEach(dot => {
    dot.addEventListener('click', () => goToTestimonial(Number(dot.dataset.index)));
  });
}

function goToTestimonial(index) {
  const cards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.t-dot');
  if (!cards.length) return;

  cards[currentTestimonial].classList.remove('active');
  dots[currentTestimonial].classList.remove('active');
  dots[currentTestimonial].setAttribute('aria-selected', 'false');

  currentTestimonial = (index + testimonials.length) % testimonials.length;

  cards[currentTestimonial].classList.add('active');
  dots[currentTestimonial].classList.add('active');
  dots[currentTestimonial].setAttribute('aria-selected', 'true');
}

function initTestimonialControls() {
  const prev = document.getElementById('t-prev');
  const next = document.getElementById('t-next');
  if (!prev || !next) return;

  prev.addEventListener('click', () => goToTestimonial(currentTestimonial - 1));
  next.addEventListener('click', () => goToTestimonial(currentTestimonial + 1));
}

/* ══════════════════════════════════════════════
   MENU PAGE
══════════════════════════════════════════════ */

function buildMenuCard(item, favs) {
  const isFav = favs.includes(item.id);
  return `
    <article class="menu-card" data-id="${item.id}" data-category="${item.category}">
      <img
        src="${item.image}"
        alt="${item.name}"
        width="600"
        height="380"
        loading="lazy"
      />
      <div class="menu-card-body">
        <div class="menu-card-top">
          <h3>${item.name}</h3>
          <span class="menu-price">${formatPrice(item.price)}</span>
        </div>
        <p>${item.description}</p>
        <button
          class="fav-btn ${isFav ? 'saved' : ''}"
          data-id="${item.id}"
          aria-label="${isFav ? 'Remove from favourites' : 'Save to favourites'}: ${item.name}"
          aria-pressed="${isFav}"
        >
          <span class="heart" aria-hidden="true">${isFav ? '♥' : '♡'}</span>
          <span>${isFav ? 'Saved' : 'Save'}</span>
        </button>
      </div>
    </article>`;
}

function renderMenuGrid(category = 'all') {
  const grid = document.getElementById('menu-grid');
  if (!grid) return;

  const favs = getFavourites();

  const filtered = category === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === category);

  if (filtered.length === 0) {
    grid.innerHTML = `<p style="color:var(--text-mute); padding:2rem 0;">No items in this category yet.</p>`;
    return;
  }

  grid.innerHTML = filtered.map(item => buildMenuCard(item, favs)).join('');
  attachFavouriteListeners();
  updateFavNotice();
}

function attachFavouriteListeners() {
  document.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      const updatedFavs = toggleFavourite(id);

      const isFav = updatedFavs.includes(id);
      btn.classList.toggle('saved', isFav);
      btn.setAttribute('aria-pressed', String(isFav));
      btn.setAttribute('aria-label', `${isFav ? 'Remove from favourites' : 'Save to favourites'}: ${btn.closest('.menu-card').querySelector('h3').textContent}`);

      const heart = btn.querySelector('.heart');
      const label = btn.querySelector('span:last-child');
      heart.textContent = isFav ? '♥' : '♡';
      label.textContent = isFav ? 'Saved' : 'Save';

      updateFavNotice();
    });
  });
}

function updateFavNotice() {
  const notice = document.getElementById('fav-notice');
  const countEl = document.getElementById('fav-count');
  if (!notice || !countEl) return;

  const favs = getFavourites();
  if (favs.length > 0) {
    notice.hidden = false;
    countEl.textContent = String(favs.length);
  } else {
    notice.hidden = true;
  }
}

function initMenuFilters() {
  const btns = document.querySelectorAll('.filter-btn');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMenuGrid(btn.dataset.category);
    });
  });
}

function initClearFavourites() {
  const clearBtn = document.getElementById('clear-favs');
  if (!clearBtn) return;
  clearBtn.addEventListener('click', () => {
    saveFavourites([]);
    renderMenuGrid(document.querySelector('.filter-btn.active')?.dataset.category || 'all');
  });
}

/* ══════════════════════════════════════════════
   CONTACT / RESERVATION FORM
══════════════════════════════════════════════ */

function validateField(input, errorId, message) {
  const errorEl = document.getElementById(errorId);
  if (!errorEl) return true;
  if (!input.value.trim()) {
    input.classList.add('invalid');
    errorEl.textContent = message;
    return false;
  }
  input.classList.remove('invalid');
  errorEl.textContent = '';
  return true;
}

function validateEmail(input, errorId) {
  const errorEl = document.getElementById(errorId);
  if (!errorEl) return true;
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.value.trim()) {
    input.classList.add('invalid');
    errorEl.textContent = 'Email address is required.';
    return false;
  }
  if (!pattern.test(input.value.trim())) {
    input.classList.add('invalid');
    errorEl.textContent = 'Please enter a valid email address.';
    return false;
  }
  input.classList.remove('invalid');
  errorEl.textContent = '';
  return true;
}

function validateDate(input, errorId) {
  const errorEl = document.getElementById(errorId);
  if (!errorEl) return true;
  if (!input.value) {
    input.classList.add('invalid');
    errorEl.textContent = 'Please select a date.';
    return false;
  }
  const selected = new Date(input.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (selected < today) {
    input.classList.add('invalid');
    errorEl.textContent = 'Please select a future date.';
    return false;
  }
  input.classList.remove('invalid');
  errorEl.textContent = '';
  return true;
}

function initReservationForm() {
  const form = document.getElementById('reservation-form');
  if (!form) return;

  // Set min date on date input to today
  const dateInput = document.getElementById('res-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  // Show last reservation from localStorage
  const lastRes = getLastReservation();
  if (lastRes) {
    const section = document.getElementById('past-reservations');
    const display = document.getElementById('last-reservation-display');
    if (section && display) {
      section.hidden = false;
      display.innerHTML = `
        <p><strong>Name:</strong> ${lastRes.name}</p>
        <p><strong>Date:</strong> ${lastRes.date} at ${lastRes.time}</p>
        <p><strong>Guests:</strong> ${lastRes.guests}</p>`;
    }
  }

  // Clear saved reservation button
  const clearResBtn = document.getElementById('clear-reservation');
  if (clearResBtn) {
    clearResBtn.addEventListener('click', () => {
      clearReservation();
      const section = document.getElementById('past-reservations');
      if (section) section.hidden = true;
    });
  }

  // Form submission
  form.addEventListener('submit', e => {
    e.preventDefault();

    const nameInput = document.getElementById('full-name');
    const emailInput = document.getElementById('email');
    const dateInputEl = document.getElementById('res-date');
    const timeInput = document.getElementById('res-time');
    const guestsInput = document.getElementById('guests');

    const validName = validateField(nameInput, 'name-error', 'Full name is required.');
    const validEmail = validateEmail(emailInput, 'email-error');
    const validDate = validateDate(dateInputEl, 'date-error');
    const validTime = validateField(timeInput, 'time-error', 'Please select a preferred time.');
    const validGuests = validateField(guestsInput, 'guests-error', 'Please select number of guests.');

    if (!validName || !validEmail || !validDate || !validTime || !validGuests) return;

    // Save to localStorage
    const reservation = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      date: dateInputEl.value,
      time: timeInput.value,
      guests: guestsInput.value,
    };
    saveReservation(reservation);

    // Show success message
    const success = document.getElementById('form-success');
    const successName = document.getElementById('success-name');
    if (success && successName) {
      successName.textContent = reservation.name.split(' ')[0];
      success.hidden = false;
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    form.reset();
  });

  // Live inline validation on blur
  form.querySelectorAll('input[required], select[required]').forEach(field => {
    field.addEventListener('blur', () => {
      if (field.id === 'email') {
        validateEmail(field, 'email-error');
      } else if (field.id === 'res-date') {
        validateDate(field, 'date-error');
      } else {
        const errorId = `${field.id.replace('full-', '').replace('res-', '').replace('guests', 'guests')}-error`;
        const messages = {
          'full-name': 'Full name is required.',
          'res-time': 'Please select a preferred time.',
          'guests': 'Please select number of guests.',
        };
        validateField(field, errorId, messages[field.id] || 'This field is required.');
      }
    });
  });
}

/* ══════════════════════════════════════════════
   LAZY LOAD OBSERVER
══════════════════════════════════════════════ */

function initLazyLoad() {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        img.classList.add('loaded');
        obs.unobserve(img);
      }
    });
  }, { rootMargin: '200px 0px' });

  document.querySelectorAll('img[loading="lazy"]').forEach(img => observer.observe(img));
}

/* ══════════════════════════════════════════════
   INIT
══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  setYear();
  initNav();
  initLazyLoad();

  // Home page
  renderFeaturedItems();
  renderHoursTable();
  renderTestimonials();
  initTestimonialControls();

  // Menu page
  renderMenuGrid('all');
  initMenuFilters();
  initClearFavourites();

  // Contact page
  initReservationForm();
});
