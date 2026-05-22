const temp = 32;
const speed = 8;

function calculateWindChill(temp, speed) {
    return (
        13.12 +
        0.6215 * temp -
        11.37 * Math.pow(speed, 0.16) +
        0.3965 * temp * Math.pow(speed, 0.16)
    ).toFixed(1);
}

let windChill = "N/A";

if (temp <= 10 && speed > 4.8) {
    windChill = `${calculateWindChill(temp, speed)} °C`;
}

document.getElementById("windchill").textContent = windChill;

document.getElementById("current-year").textContent =
    new Date().getFullYear();

document.getElementById("lastModified").textContent =
    `Last Modified: ${document.lastModified}`;