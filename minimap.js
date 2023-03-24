/* To be able to determine which map was selected by the user.
 * Information passed by index.js
*/

const params = new URLSearchParams(window.location.search)
const index = params.get('index')

/* To show map part elements below smokePositions and the tutorial video (tutorial video not included yet.) */
const container = document.querySelector('.slider-container');
const track = document.querySelector('.slider-track');

const prevBtn = document.querySelector('.prev-button');
const nextBtn = document.querySelector('.next-button');

class Spot {
    constructor(mapName, spotTitle, spotName, spotImageNumber){
        this.mapName = mapName;
        this.spotTitle = spotTitle;
        this.spotName = spotName;
        this.spotImageNumber = spotImageNumber;
    }
}


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
            spotToStorageAndRedirection(map)
        })

        track.appendChild(cardDiv)
    })
}

function redirectCircle(spotName) {
    const selectedSpot = dust2Spots.find(spot => spot.spotName == spotName)
    spotToStorageAndRedirection(selectedSpot)
    
}

const spotToStorageAndRedirection = (selectedSpot) => {
    const myObject = { mapName: selectedSpot.mapName, spotName: selectedSpot.spotName, spotImageNumber: selectedSpot.spotImageNumber }
    const myObjectString = JSON.stringify(myObject)
    localStorage.setItem('spotToLoad', myObjectString)
    window.location.href = "mapdetails.html"
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
        createMapPartDivs(dust2Spots)
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





let slidePosition = 0;
let itemsVisible = 0;
const items = Array.from(document.querySelectorAll('.mapDetailCard'));

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