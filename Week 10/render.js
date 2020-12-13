const images = require('images')

function render(viewport, element) {
    if (element.style) {
        const img = images(element.style.width, element.style.height)

        if (element.style['background']) {
            let color = element.style['background'] || 'rgb(100,100,100)'
            color.match(/rgb\((\d+),(\d+),(\d+)\)/)
            console.log('color', color)
            console.log(Number(RegExp.$1), Number(RegExp.$2), Number(RegExp.$3))
            img.fill(Number(RegExp.$1), Number(RegExp.$2), Number(RegExp.$3), 1)
            viewport.draw(img, element.style.left || 0, element.style.top || 0)
        }
    }
    console.log('element', element)
    if (element.children) {
        for (var child of element.children) {
            render(viewport, child)
        }
    } 
}

module.exports = render