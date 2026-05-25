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
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/2019/800x500/4-Rome-Temple-2160935.jpg"
    },
    {
        templeName: "Accra Ghana",
        location: "Accra, Ghana",
        dedicated: "2004, January, 11",
        area: 17500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/accra-ghana/800x450/accra-ghana-temple-detail-249022-2400x1200.jpg"
    }
];
 
 
 
function getDedicatedYear(temple) {
    return parseInt(temple.dedicated.split(",")[0].trim(), 10);
}
 
 
function createTempleCard(temple) {
    
    const figure = document.createElement("figure");
 t
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
 
 
const grid    = document.getElementById("temple-grid");
const titleEl = document.getElementById("filter-title");
 
function displayTemples(filteredArray, headingText) {
   
    titleEl.textContent = headingText;
 
    const oldFigures = grid.querySelectorAll("figure");
    oldFigures.forEach(fig => fig.remove());
 
   
    if (filteredArray.length === 0) {
        const msg = document.createElement("p");
        msg.textContent = "No temples match this filter.";
        msg.style.cssText = "grid-column:1/-1; text-align:center; padding:2rem; color:#555;";
        grid.appendChild(msg);
        return;
    }
 
   
    filteredArray.forEach(function(temple) {
        const card = createTempleCard(temple);
        grid.appendChild(card);
    });
}
 
 

const filterMap = {
    home:  { label: "Home",                  fn: () => temples },
    old:   { label: "Old  (before 1900)",    fn: () => temples.filter(t => getDedicatedYear(t) < 1900) },
    new:   { label: "New  (after 2000)",     fn: () => temples.filter(t => getDedicatedYear(t) > 2000) },
    large: { label: "Large  (> 90,000 sq ft)", fn: () => temples.filter(t => t.area > 90000) },
    small: { label: "Small  (< 10,000 sq ft)", fn: () => temples.filter(t => t.area < 10000) }
};
 
 

 
const menuLinks = document.querySelectorAll("#menu a");
 
menuLinks.forEach(function(link) {
    link.addEventListener("click", function(event) {
        event.preventDefault();   
 
        const filterKey = event.target.dataset.filter;   
 
        if (filterMap[filterKey]) {
            displayTemples(
                filterMap[filterKey].fn(),
                filterMap[filterKey].label
            );
        }
 
       
        document.getElementById("menu").classList.remove("open");
    });
});
 
 

 
document.getElementById("menu-btn").addEventListener("click", function() {
    document.getElementById("menu").classList.toggle("open");
});
 
 

document.getElementById("current-year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent  = "Last Modified: " + document.lastModified;
 
 

displayTemples(filterMap.home.fn(), filterMap.home.label);
 