/* 
TODOs:
-Clean style.css
-Put the smokes folder into the images folder - modify src of the images. New src should start with images/smokes/...
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
}

/* To be able to determine which map was selected by the user.
 * Information passed by index.js
*/
const params = new URLSearchParams(window.location.search)
const index = params.get('index')

/* DOM elements to show smokePositions (smoke lineups) on top of the screen */
const lineupHeader = document.getElementById('lineup-header')
const detailsDiv = document.getElementById('detailsContent')
const smokePositions = document.createElement('div')
smokePositions.id = 'smokePositions'

/* For tutorial video below smokePositions div (not included yet.) */
const smokeVideoDiv = document.getElementById('smokeVideo')
const iframe = document.getElementById('setupVideo')
// Hard coded a video to test embedding
//iframe.src = 'https://www.youtube.com/embed/OokgEC8AFoo'
// detailsDiv.appendChild(smokeVideoDiv)

/* To show map part elements below smokePositions and the tutorial video (tutorial video not included yet.) */
const container = document.querySelector('.slider-container');
const track = document.querySelector('.slider-track');
const items = Array.from(document.querySelectorAll('.mapDetailCard'));
const prevBtn = document.querySelector('.prev-button');
const nextBtn = document.querySelector('.next-button');


let infernoSpots = []
let overpassSpots = []
let vertigoSpots = []
let nukeSpots = []
let ancientSpots = []
let anubisSpots = []
let dust2Spots = []

const createDust2Spots = () => {
    dust2Spots.push(new Spot('dust2','B DOORS', 'b-doors', 4))
    dust2Spots.push(new Spot('dust2', 'B WINDOW', 'b-window', 4))
    dust2Spots.push(new Spot('dust2', 'LONG CORNER', 'long-corner', 4))
    dust2Spots.push(new Spot('dust2', 'CT | FROM LONG', 'long-push-ct', 4))
    dust2Spots.push(new Spot('dust2', 'MID TO B', 'mid-to-b', 4))
    dust2Spots.push(new Spot('dust2', 'PIT', 'pit', 4))
    dust2Spots.push(new Spot('dust2', 'SHORT | FROM LONG', 'short-from-long', 4))
    dust2Spots.push(new Spot('dust2', 'SHORT ONE WAY', 'short-one-way', 5))
    dust2Spots.push(new Spot('dust2', 'CT | FROM SHORT', 'short-push-ct', 5))
    dust2Spots.push(new Spot('dust2', 'TUNNEL | FROM MID', 'tunnel-mid', 5))
    dust2Spots.push(new Spot('dust2', 'XBOX | LOWER TUNNEL', 'xbox-lower-tunnel', 4))
    dust2Spots.push(new Spot('dust2', 'XBOX | T SPAWN', 'xbox-t-spawn', 4))
}

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

/* Loading data only into the necessary array.
 * Alerting the user if the selected map is not available yet.
 * selectedIndex comes from the index coming from index.js 
 */
const createCorrectMapParts = (selectedIndex) => {
    if(selectedIndex == 0) {
        alert("Work in progess... Check back later!")
        window.location.href = "index.html"
        // createMirageSpots()
    } else if(selectedIndex == 1) {
        alert("Work in progess... Check back later!")
        window.location.href = "index.html"
        // createInfernoSpots()
    } else if(selectedIndex == 2) {
        alert("Work in progess... Check back later!")
        window.location.href = "index.html"
        // createOverpassSpots()
    } else if(selectedIndex == 3) {
        alert("Work in progess... Check back later!")
        window.location.href = "index.html"
        // createVertigoSpots()
    } else if(selectedIndex == 4) {
        alert("Work in progess... Check back later!")
        window.location.href = "index.html"
        // createNukeSpots()
    } else if(selectedIndex == 5) {
        alert("Work in progess... Check back later!")
        window.location.href = "index.html"
        // createAncientSpots()
    } else if(selectedIndex == 6) {
        createDust2Spots()
    } else if(selectedIndex == 7) {
        alert("Work in progess... Check back later!")
        window.location.href = "index.html"
        // createAnubisSpots()
    } else {
        alert("Something went wrong. Please try again later.")
        window.location.href = "index.html"
    }
}

createCorrectMapParts(index)

/* Dynamically creating map parts cards 
Class: .mapDetailCard, id: Spot.spotName
Append each card to .slider-track
*/
const createMapPartDivs = (selectedMap) => {
    selectedMap.forEach((map) => {
        let cardDiv = document.createElement('div')
        cardDiv.classList.add('mapDetailCard')
        cardDiv.id = map.spotName

        let spotImage = document.createElement('img')
        spotImage.src = `smokes/${map.mapName}/${map.spotName}${map.spotImageNumber}.jpg`
        cardDiv.appendChild(spotImage)

        let spotName = document.createElement('p')
        spotName.classList.add('positionName')
        spotName.innerText = map.spotTitle

        cardDiv.appendChild(spotName)

        cardDiv.addEventListener('click', () => {
            loadImages(map)
        })

        track.appendChild(cardDiv)
    })
}

createMapPartDivs(dust2Spots)

/*
 * This function calls all the necessary functions to create the smoke lineup UI
 * Receiving the map Spot from the createMapPartsDiv function.
 */ 
const loadImages = (map) => {
    lineupHeader.style = "display: block;"
    detailsDiv.style.display = 'block'

    removeChildElements()
    createImages(map)
    fullScreenElements()
}

/*
 * This function creates the smoke lineup image elements then adds them to the correct container (smokePositions)
 */
const createImages = (map) => {
    for(let i=1; i < (map.spotImageNumber+1); i++){
        let image = document.createElement('img')
        image.classList.add('smokeImage', 'fullscreen-image')
        try {
            image.src = `smokes/${map.mapName}/${map.spotName}${i}.jpg`
        } catch (e) {
            continue;
        }

        smokePositions.appendChild(image)
    }
    detailsDiv.appendChild(smokePositions)
}

/* 
 * This function is responsible for handling event listeners regarding making the smoke lineup images full screen.
 * Including click and keydown events.
*/
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
}

/* Removing every child elements from the smokePositions div.
 * In this case, the users will only see the selected map part smoke lineups
 * instead of adding more non-relevant pictures to the div.
 */
const removeChildElements = () => {
    if(smokePositions.childElementCount > 0) {
        while(smokePositions.firstChild) {
            smokePositions.removeChild(smokePositions.firstChild)
        }
    }
}

let slidePosition = 0;
let itemsVisible = 0;

/*
 * Calculating container and item width, in this case only the items that fits the screen will be visible.
*/
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

// Click event listener on the 'Next' button. Scrolling to the next item on each click.
nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: 310, behavior: 'smooth' });
  });

// Click event listener on the 'Prev' button. Scrolling to the previous item on each click.
prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -310, behavior: 'smooth' });
  });

window.addEventListener('resize', () => {
  updateWidth();
});

updateWidth();

