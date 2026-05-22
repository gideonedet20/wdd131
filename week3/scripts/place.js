const year = new Date().getFullYear();
document.getElementById("current-year")
.textContent = year;

document.getElementById("lastModified")
.textContent = `Last Modification: ${document.lastModified}`;

const temperature = 32;
const windSpeed = 8;

function calculateWindChill(temp, speed){

    return (
        13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16)

    ).toFixed(1);

}

let windChill = "N/A";

if (temperature <= 10 && windSpeed > 4.8){

    windChill =`${calculateWindChill(
        temperature,
        windSpeed
    )} °C`;
}

document.getElementById("windchill")
.textContent = windChill;