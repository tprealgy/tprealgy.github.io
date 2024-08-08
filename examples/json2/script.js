// Create variables for the text and images divs
const text = document.querySelector(".text");
const images = document.querySelector(".images");

// Create 100 images and append them to the images div
var imagesMaxAmount = 100;

for (let i = 0; i < imagesMaxAmount; i++) {
  const img = document.createElement("img");
  img.src = `img/Picture${i}.png`;
  images.appendChild(img);
}

// Not a perfect solution, but it works. It would be better to check IF there are images available and then append them to the images div. Detta går att lösa med NodeJS.

// Fetch JSON data
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const fishArray = data.fish;

    // Loop through the fish data and create HTML for each fish
    fishArray.forEach((fish) => {
      const fishName = fish.name;
      const fishDescription = fish.description;

      // Create HTML elements
      const fishElement = document.createElement("div");
      fishElement.innerHTML = `
      <h2>${fishName}</h2>
      <p>${fishDescription}</p>
    `;

      // Append the fish HTML to the fishInfo div
      text.appendChild(fishElement);
    });
  })
  .catch((error) => console.error("Error fetching JSON:", error));

// Hide broken images
document.addEventListener("DOMContentLoaded", function (event) {
  document.querySelectorAll("img").forEach(function (img) {
    img.onerror = function () {
      this.style.display = "none";
    };
  });
});
