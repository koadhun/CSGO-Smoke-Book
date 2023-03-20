/* 
TODOs:
-Clean style.css
-Put the smokes folder into the images folder - modify src of the images. New src should start with images/smokes/...
-Create map spots for all maps.
-Add tutorial video below the smoke lineups
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
smokePositions.id = 'smokePositions'

/* For tutorial video below smokePositions div (not included yet.) */
const smokeVideoDiv = document.getElementById('smokeVideo')
const iframe = document.getElementById('setupVideo')
// Hard coded a video to test embedding
//iframe.src = 'https://www.youtube.com/embed/OokgEC8AFoo'
// detailsDiv.appendChild(smokeVideoDiv)

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
 * This function is responsible for handling event listeners regarding making the smoke lineup images full screen.
 * Including click and keydown events.
*/


/*  TODO: Modify the code below as the following:
 Make the small images to a slider container like in minimap.html
 If a small image is clicked, then change bigImage src to the small image src.
 If the bigImage is clicked, then request fullscreen.
 In fullscreen, be able to close fullscreen with click or 'esc' keydown.
 Also be able to step to next and previous images with right and left keydown events.
 If the image is not in fullscreen, then left and right keydown events should step to the next small image.
 Meaning that the bigImage src should change on these keydown events. */
const fullScreenElements = () => {
    // get all the images on the page
    const images = document.querySelectorAll('.fullscreen-image')
    let currentImageIndex = 0

    // add click event listener to each image
    images.forEach((image, index) => {
       // image.addEventListener('click', () => toggleFullScreen(index))
       image.addEventListener('click', () => bigImage.src = image.src)
    })

    bigImage.addEventListener('click', toggleFullScreen())

    // function to toggle fullscreen mode
    function toggleFullScreen() {
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

loadImages(mySpot)