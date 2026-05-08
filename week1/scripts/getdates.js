const year = new Date().getFullYear();
document.getElementById('current-year').textContent = year;

const lastModified = new Date(document.lastModified);
document.getElementById('lastModified').textContent = `Last Modified: ${lastModified.toLocaleString()}`;

function updateDateTime() {
    let now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    let amPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; 

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    let timeString = `${hours}:${minutes}:${seconds} ${amPm}`;

    document.getElementById('time').textContent = timeString;
}

setInterval(updateDateTime, 1000);
updateDateTime(); // Initial call to display time immediately