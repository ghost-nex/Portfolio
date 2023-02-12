const formInput = document.getElementById('form-input')
const colorPicker = document.getElementById('color-picker')
const modeSelect = document.getElementById('mode-select')
const colorImage1 = document.getElementById('color-image-1')
const colorImage2 = document.getElementById('color-image-2')
const colorImage3 = document.getElementById('color-image-3')
const colorImage4 = document.getElementById('color-image-4')
const colorImage5 = document.getElementById('color-image-5')
const hexValue1 = document.getElementById('hex-value-1')
const hexValue2 = document.getElementById('hex-value-2')
const hexValue3 = document.getElementById('hex-value-3')
const hexValue4 = document.getElementById('hex-value-4')
const hexValue5 = document.getElementById('hex-value-5')


function hex2rgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    // return {r, g, b} // return an object
    return {r, g, b}
}




formInput.addEventListener('submit', function(e) {
    e.preventDefault()
    const re = hex2rgb(colorPicker.value).r
    const gr = hex2rgb(colorPicker.value).g
    const bl = hex2rgb(colorPicker.value).b
    fetch(`https://www.thecolorapi.com/scheme?rgb=${re},${gr},${bl}&mode=${modeSelect.value}&count=5`, {method: 
        "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            colorImage1.style.backgroundColor = data.colors[0].hex.value
            colorImage2.style.backgroundColor = data.colors[1].hex.value
            colorImage3.style.backgroundColor = data.colors[2].hex.value
            colorImage4.style.backgroundColor = data.colors[3].hex.value
            colorImage5.style.backgroundColor = data.colors[4].hex.value
            hexValue1.textContent = data.colors[0].hex.value
            hexValue2.textContent = data.colors[1].hex.value
            hexValue3.textContent = data.colors[2].hex.value
            hexValue4.textContent = data.colors[3].hex.value
            hexValue5.textContent = data.colors[4].hex.value
        })
})