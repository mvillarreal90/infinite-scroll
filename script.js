const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let ready = false;
let photosLoaded = 0;
let totalPhotos = 0;
let isInitialLoad = true;

// Unsplash API
let photosCount = 5;
const apiKey = 'UdkYtohABpaW7E9nyDQ5_tRS4xq2wtEP7EaUDcue6sM';
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${photosCount}`;

function updateAPIURLWithNewCount (newCount) {
  apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${newCount}`;
}

function imageLoaded() {
  photosLoaded++;
  if (photosLoaded === totalPhotos) {
    ready = true;
    loader.hidden = true;
  }
}

function setAttributesInDOM(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  photosLoaded = 0;
  totalPhotos = photosArray.length;
  photosArray.forEach(photo => {
    const item = document.createElement('a');
    setAttributesInDOM(item, {
      href: photo.links.html,
      target: '_blank'
    })
    const img = document.createElement('img');
    setAttributesInDOM(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    })
    img.addEventListener('load', imageLoaded);
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

async function getPhotosFromApi() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    if (isInitialLoad) {
      updateAPIURLWithNewCount(30);
      isInitialLoad = false;
    }
  } catch (err) {
    loader.hidden = false;
  }
}

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotosFromApi();
  }
})

// On Load
getPhotosFromApi();