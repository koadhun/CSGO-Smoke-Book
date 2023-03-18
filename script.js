/* 
TODOs:
-Clean the code (there are a lot of codes that might not be in use)
-Add comments
-Put the smokes folder into the images folder - modify src of the images. New src should start with images/smokes/...
-Load map parts into UI from Spot class dynamically
-Create map spots for all maps.
-Add tutorial video below the smoke lineups
-Modify the smoke lineups UI to be scrollable like the map parts part of the UI.
-Add a background image for the body
*/

class Spot {
    constructor(mapName, spotTitle, spotName, spotImageNumber){
        this.mapName = mapName;
        this.spotTitle = spotTitle;
        this.spotName = spotName;
        this.spotImageNumber = spotImageNumber;
    }

    getMapName() {
        return mapName;
    }

    getSpotTitle() {
        return spotTitle;
    }

    getSpotName() {
        return spotName;
    }

    getSpotImageNumber() {
        return spotImageNumber;
    }

    getImageSrc() {
        return `smokes/${mapName}/${spotName}${spotImageNumber}.jpg`
    }
}

const params = new URLSearchParams(window.location.search)
const index = params.get('index')
const smokeVideoDiv = document.getElementById('smokeVideo')
const lineupHeader = document.getElementById('lineup-header')

const body = document.querySelector('body')

const createDust2Spots = () => {
    const bDoors = new Spot('dust2','B DOORS', 'b-doors', 4)
    const bWindow = new Spot('dust2', 'B WINDOW', 'b-window', 4)
    const longCorner = new Spot('dust2', 'LONG CORNER', 'long-corner', 4)
    const longPushCt = new Spot('dust2', 'CT | FROM LONG', 'long-push-ct', 4)
    const midToB = new Spot('dust2', 'MID TO B', 'mid-to-b', 4)
    const pit = new Spot('dust2', 'PIT', 'pit', 4)
    const shortFromLong = new Spot('dust2', 'SHORT | FROM LONG', 'short-from-long', 4)
    const shortOneWay = new Spot('dust2', 'SHORT ONE WAY', 'short-one-way', 5)
    const shortPushCt = new Spot('dust2', 'CT | FROM SHORT', 'short-push-ct', 5)
    const tunnelMid = new Spot('dust2', 'TUNNEL | FROM MID', 'tunnel-mid', 5)
    const xboxLowerTunnel = new Spot('dust2', 'XBOX | LOWER TUNNEL', 'xbox-lower-tunnel', 4)
    const xboxTspawn = new Spot('dust2', 'XBOX | T SPAWN', 'xbox-t-spawn', 4)
}
let dust2Spots = createDust2Spots()

let maps = ['mirage', 'inferno', 'overpass', 'vertigo', 'nuke', 'ancient', 'dust2', 'anubis']
let infernoSpots = []
let overpassSpots = []
let vertigoSpots = []
let nukeSpots = []
let ancientSpots = []
let anubisSpots = []


/* 
detailsContent
 -slider-wrapper
   -slider-container
   -button.prev-lineup-button
   -smokePositions
   -button.next-lineup-button
*/
const detailsDiv = document.getElementById('detailsContent')
const smokePositions = document.createElement('div')
smokePositions.id = 'smokePositions'
// Code now will work only with hardcoded dust2 selection.
// TODO: Get the map name from index.html selection, then load data depending on that.

detailsDiv.appendChild(smokePositions)


// detailsDiv.appendChild(smokeVideoDiv)
const iframe = document.getElementById('setupVideo')

// Hard coded a video to test embedding
//iframe.src = 'https://www.youtube.com/embed/OokgEC8AFoo'

// Whats new:

/* 
    Added JavaScript
    Hard coded images, embedding for testing purposes.
    Basic CSS (Final layout still in progress)
*/

/*
Indexes:
1: mirage
2: inferno
3: overpass
4: vertigo
5: nuke
6: ancient
7: dust2
8: anubis
*/ 
const loadImages = (imageSrc, numberOfPictures) => {
    lineupHeader.style = "display: block;"
    detailsDiv.style.display = 'block'

    removeChildElements()
    createImages('dust2',imageSrc, numberOfPictures)
    fullScreenElements()
}

const createImages = (map, imageSrc, numberOfPictures) => {
    for(let i=1; i < (numberOfPictures+1); i++){
        let image = document.createElement('img')
        image.classList.add('smokeImage', 'fullscreen-image')
        try {
            image.src = `smokes/${map}/${imageSrc}${i}.jpg`
            console.log()
        } catch (e) {
            continue;
        }
        smokePositions.appendChild(image)
    }
}


const fullScreenElements = () => {

    // get all the images on the page
    const images = document.querySelectorAll('.fullscreen-image')
    let currentImageIndex = 0

    // add click event listener to each image
    images.forEach((image, index) => {
        image.addEventListener('click', () => toggleFullScreen(index))
    })

    // function to toggle fullscreen mode
    function toggleFullScreen(index) {
    if (!document.fullscreenElement) {
        currentImageIndex = index
        // if not in fullscreen mode, go into fullscreen mode
        images[currentImageIndex].requestFullscreen()
    } else {
        // if in fullscreen mode, exit fullscreen mode
        document.exitFullscreen()
    }
    }

    // add keydown event listener to exit fullscreen mode when pressing "Escape" key
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && document.fullscreenElement) {
            document.exitFullscreen()
        } else if(document.fullscreenElement) {
            if(event.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % images.length // % added to handle wrapping around when we reach the end of the image array
                images[currentImageIndex].requestFullscreen()
            } else if(event.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length; // % added to handle wrapping around when we reach the beginning of the image array.
                images[currentImageIndex].requestFullscreen()
            }
        }
    })

     /* Modify the code so user can click on left-right arrow to step to the next-previous picture
        and add keydown event listener for right and left arrow to do the same */
}

// Removing every child elements from the smokePositions div.
const removeChildElements = () => {
    if(smokePositions.childElementCount > 0) {
        while(smokePositions.firstChild) {
            smokePositions.removeChild(smokePositions.firstChild)
        }
    }
}

// 
const mapPartSelected = () => {
    const allMapPartCards = document.querySelectorAll('.mapDetailCard')
    allMapPartCards.forEach(function(map) {
        map.addEventListener('click', () => {
            let numberOfPictures = 0
            let mapsWith4Pictures = ['b-doors','b-window','long-corner','long-push-ct','mid-to-b',
                                     'pit','short-from-long', 'xbox-lower-tunnel','xbox-t-spawn']

            let mapsWith5Pictures = ['short-one-way','short-push-ct','tunnel-mid']

            if(mapsWith4Pictures.includes(map.id)){
                numberOfPictures = 4
            } else if(mapsWith5Pictures.includes(map.id)){
                numberOfPictures = 5
            } else {
                alert('Something went wrong. Please, try again later!')
            }
            // if id = 4 képes mapok, akkor numberofpicts: 4, másiknál 5
            loadImages(map.id, numberOfPictures)

            window.scrollTo({top: 0, behavior: 'smooth'})
        })
    })
}

mapPartSelected()

const container = document.querySelector('.slider-container');
const track = document.querySelector('.slider-track');
const items = Array.from(document.querySelectorAll('.mapDetailCard'));
const prevBtn = document.querySelector('.prev-button');
const nextBtn = document.querySelector('.next-button');

// rest of the JavaScript code


let slidePosition = 0;
let itemsVisible = 0;

function updateWidth() {
  const containerWidth = container.getBoundingClientRect().width;
  const itemWidth = items[0].getBoundingClientRect().width;
  const itemMargin = parseFloat(window.getComputedStyle(items[0]).marginRight);
  const itemsPerScreen = Math.floor(containerWidth / (itemWidth + itemMargin));
  const totalWidth = (itemWidth + itemMargin) * items.length;
  const trackWidth = (itemWidth + itemMargin) * itemsPerScreen;

  itemsVisible = itemsPerScreen;
  track.style.width = `${totalWidth}px`;
  track.style.transform = `translateX(${slidePosition}px)`;
  container.style.overflowX = 'hidden';
  container.style.position = 'relative';
  track.style.position = 'relative';
  track.style.display = 'flex';
  track.style.transition = 'transform 0.3s ease-in-out';
  track.style.willChange = 'transform';
  track.style.width = `${trackWidth}px`;
}


nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: 310, behavior: 'smooth' });
  });
  
prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -310, behavior: 'smooth' });
  });

window.addEventListener('resize', () => {
  updateWidth();
});

updateWidth();

