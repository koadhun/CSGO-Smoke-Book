const maps = document.querySelectorAll('.map-card')

maps.forEach((map) => {
    map.addEventListener('click', () => {
        const mapIndex = Array.from(maps).indexOf(map)
        const link = document.createElement('a')
        link.href = `minimap.html?index=${mapIndex}`
        link.target = 'self'
        link.click()
    })  
})