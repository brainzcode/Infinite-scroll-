const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 10;
const apiKey = process.env.APIKEY;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Image Loaded function
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
      ready = true;
      loader.hidden = true;
      count = 30;
  }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // Run Function for each object in photosArray
  photosArray.forEach((photo) => {
    const item = document.createElement('a');
    setAttributes(item, {
        href: photo.links.html,
        target: '_blank', });
    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, { 
      src: photo.urls.regular, 
      alt: photo.alt_description, 
      title: photo.alt_description, })

      img.addEventListener('load', imageLoaded);
    // Put <img> inside <a>, then put both inside our imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get Photos From Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // Catch Error Here
  }
}

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
      ready = false;
      getPhotos();
  }
  })
// On Load
getPhotos();