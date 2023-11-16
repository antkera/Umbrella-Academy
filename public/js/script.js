// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("Umbrella-academy JS imported successfully!");
});

let map = L.map("map").setView([41.3977421, 2.1902493], 15);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);
L.marker([41.3977421, 2.1902493])
  .addTo(map)
  .bindPopup("¡Hola! Aquí estamos.")
  .openPopup();
