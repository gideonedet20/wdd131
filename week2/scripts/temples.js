// ===============================
// MOBILE NAVIGATION MENU
// ===============================
const menuBtn = document.getElementById("menu-btn");
const menuList = document.getElementById("menu");

if (menuBtn && menuList) {
    menuBtn.addEventListener("click", (e) => {
        e.preventDefault(); 
        menuList.classList.toggle("show");
        console.log("Menu toggled! Current classes:", menuList.className); 
    });
} else {
    console.error("Could not find menu-btn or menu elements in the DOM.");
}

// ===============================
// CURRENT YEAR
// ===============================
const year = new Date().getFullYear();
const yearElement = document.getElementById("current-year");
if (yearElement) {
    yearElement.textContent = year;
}

// ===============================
// LAST MODIFIED DATE
// ===============================
const lastModified = new Date(document.lastModified);
const modifiedElement = document.getElementById("lastModified");
if (modifiedElement) {
    modifiedElement.textContent = `Last Modified: ${lastModified.toLocaleString()}`;
}

// ===============================
// LIVE CLOCK
// ===============================
function updateDateTime() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // AM OR PM
    const amPm = hours >= 12 ? "PM" : "AM";

    // CONVERT TO 12-HOUR FORMAT
    hours = hours % 12 || 12;

    // ADD ZERO IF NUMBER IS BELOW 10
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // TIME FORMAT
    const timeString = `${hours}:${minutes}:${seconds} ${amPm}`;

    // DISPLAY TIME
    const timeElement = document.getElementById("time");
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

// RUN CLOCK EVERY SECOND
setInterval(updateDateTime, 1000);

// RUN IMMEDIATELY
updateDateTime();