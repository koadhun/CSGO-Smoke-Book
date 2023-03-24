/* 
TODOs:
-Clean style.css
-Put the smokes folder into the images folder - modify src of the images. New src should start with images/smokes/...
-Create map spots for all maps.
-Modify the smoke lineups UI to be scrollable like the map parts part of the UI.
-Add a background image for the body
*/
const params = new URLSearchParams(window.location.search)
const smokeId = params.get('smokeId')

const bigImage = document.getElementById('big-image')

/* DOM elements to show smokePositions (smoke lineups) on top of the screen */
const lineupHeader = document.getElementById('lineup-header')
const detailsDiv = document.getElementById('detailsContent')
const smokePositions = document.createElement('div')
smokePositions.classList.add('smokePositions')

/* For tutorial video below smokePositions div */
const smokeVideoDiv = document.getElementById('smokeVideo')
const iframe = document.getElementById('setupVideo')

//iframe.src = 'https://www.youtube.com/embed/OokgEC8AFoo'


/* Get JSON object from minimap.js */
const spotItem = localStorage.getItem('spotToLoad')
const mySpot = JSON.parse(spotItem)

/*
 * This function calls all the necessary functions to create the smoke lineup UI
 * Receiving the map Spot from the createMapPartsDiv function.
 */ 
const loadImages = (map) => {
    lineupHeader.style = "display: block;"
    detailsDiv.style.display = 'block'

    bigImage.src = `smokes/${map.mapName}/${map.spotName}1.jpg`

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
 * This function is responsible for handling event listeners regarding entering full screen mode and changing images with key events.
*/
const fullScreenElements = () => {
    const images = document.querySelectorAll('.fullscreen-image')
    let currentImageIndex = 0

    images.forEach((image) => {
       image.addEventListener('click', () => bigImage.src = image.src)
    })

    bigImage.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        bigImage.requestFullscreen()
      } else {
          document.exitFullscreen()
      }
    })

    /* Keydown event to change image display.
     * On 'Escape' keydown: exits full screen mode, if the image was opened in full screen. 
     * On 'ArrowRight' (right arrow key): changes bigImage source to the next image. Can be done in full screen mode and non-full screen mode.
     * On 'ArrowLeft' (left arrow key): changes bigImage source to the previous image. Can be done in full screen mode and non-full screen mode.
     * */
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && document.fullscreenElement) {
            document.exitFullscreen()
        } else if(event.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % images.length // '%' added to handle wrapping around when we reach the end of the image array
                bigImage.src = images[currentImageIndex].src
        } else if(event.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length; // '%' added to handle wrapping around when we reach the beginning of the image array.
                bigImage.src = images[currentImageIndex].src
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

loadImages(mySpot)
