const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

const MAX_COUNT = 30;

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

let initialLoad = true;
let initialPictureCount = 5;
const apiKey = '9FCTKcV6gRYXtvgRdcim66QzddCESn6-al3knKbLCpk';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialPictureCount}`;

function changeAPIFetchCount(pictureCount) {
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${pictureCount}`;
}

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create dom element for image and link
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
 
    // Run for each object in photosArray
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular, 
            alt: photo.alt_description, 
            title: photo.alt_description
        });
        img.addEventListener('load', imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get Photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if (initialLoad) {
            changeAPIFetchCount(MAX_COUNT);
            initialLoad = false;        
        }
    } catch (error) {
        
    }
}

// Check to see if scrolling is near a bottom of page and load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// On Load
getPhotos();