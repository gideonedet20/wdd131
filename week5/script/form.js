document.getElementById("lastModified").textContent =
    `Last Modification: ${document.lastModified}`;

document.getElementById("reviewForm").addEventListener("submit", function(e) {
    e.preventDefault();

    alert("Review submitted successfully!");

    this.reset();
});