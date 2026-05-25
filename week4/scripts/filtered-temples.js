

const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    // ── Three additional temples added by student ──────────────────────────
    {
        templeName: "Salt Lake City Utah",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253015,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/400x250/salt-lake-temple-37762.jpg"
    },
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 41000,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/2019/800x500/7-Rome-Temple-2160340.jpg"
    },
    {
        templeName: "Accra Ghana",
        location: "Accra, Ghana",
        dedicated: "2004, January, 11",
        area: 17500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/accra-ghana/800x450/accra-ghana-temple-detail-249022-2400x1200.jpg"
    }
];


// ── 2. HELPER – get just the year number from "2005, August, 7" ───────────────

function getDedicatedYear(temple) {
    return parseInt(temple.dedicated.split(",")[0].trim(), 10);
}


// ── 3. CREATE ONE TEMPLE CARD ─────────────────────────────────────────────────
//    Returns a <figure> element with img + figcaption

function createTempleCard(temple) {
    // Create the outer <figure>
    const figure = document.createElement("figure");

    // Build the inner HTML
    // Note: loading="lazy" satisfies the native lazy-loading requirement
    figure.innerHTML = `
        <img
            src="${temple.imageUrl}"
            alt="${temple.templeName} Temple"
            loading="lazy"
            width="400"
            height="200"
        />
        <figcaption>
            <h3>${temple.templeName}</h3>
            <p><span>Location:</span> ${temple.location}</p>
            <p><span>Dedicated:</span> ${temple.dedicated}</p>
            <p><span>Area:</span> ${temple.area.toLocaleString()} sq ft</p>
        </figcaption>
    `;

    return figure;
}


// ── 4. RENDER TEMPLES INTO THE PAGE ──────────────────────────────────────────
//    Clears old cards, updates the heading, appends new cards

const grid    = document.getElementById("temple-grid");
const titleEl = document.getElementById("filter-title");

function displayTemples(filteredArray, headingText) {
    // Update the section heading
    titleEl.textContent = headingText;

    // Remove any previously rendered <figure> cards (but keep the <h2>)
    const oldFigures = grid.querySelectorAll("figure");
    oldFigures.forEach(fig => fig.remove());

    // If nothing matched the filter, show a message
    if (filteredArray.length === 0) {
        const msg = document.createElement("p");
        msg.textContent = "No temples match this filter.";
        msg.style.cssText = "grid-column:1/-1; text-align:center; padding:2rem; color:#555;";
        grid.appendChild(msg);
        return;
    }

    // Loop and create a card for each temple
    filteredArray.forEach(function(temple) {
        const card = createTempleCard(temple);
        grid.appendChild(card);
    });
}


// ── 5. FILTER DEFINITIONS ─────────────────────────────────────────────────────

const filterMap = {
    home:  { label: "Home",                  fn: () => temples },
    old:   { label: "Old  (before 1900)",    fn: () => temples.filter(t => getDedicatedYear(t) < 1900) },
    new:   { label: "New  (after 2000)",     fn: () => temples.filter(t => getDedicatedYear(t) > 2000) },
    large: { label: "Large  (> 90,000 sq ft)", fn: () => temples.filter(t => t.area > 90000) },
    small: { label: "Small  (< 10,000 sq ft)", fn: () => temples.filter(t => t.area < 10000) }
};


// ── 6. NAV CLICK LISTENERS ────────────────────────────────────────────────────
//    Each <a> in the menu has data-filter="home|old|new|large|small"

const menuLinks = document.querySelectorAll("#menu a");

menuLinks.forEach(function(link) {
    link.addEventListener("click", function(event) {
        event.preventDefault();   // stop the page jumping to #

        const filterKey = event.target.dataset.filter;   // e.g. "old"

        if (filterMap[filterKey]) {
            displayTemples(
                filterMap[filterKey].fn(),
                filterMap[filterKey].label
            );
        }

        // Close the mobile dropdown after a selection
        document.getElementById("menu").classList.remove("open");
    });
});


// ── 7. MOBILE HAMBURGER MENU ──────────────────────────────────────────────────

document.getElementById("menu-btn").addEventListener("click", function() {
    document.getElementById("menu").classList.toggle("open");
});


// ── 8. FOOTER – copyright year and last-modified date ─────────────────────────

document.getElementById("current-year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent  = "Last Modified: " + document.lastModified;


// ── 9. INITIAL RENDER – show all temples when page first loads ────────────────

displayTemples(filterMap.home.fn(), filterMap.home.label);