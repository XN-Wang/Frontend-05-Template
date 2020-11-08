let draggable = document.getElementById('draggable')
let baseX = 0, baseY = 0
draggable.addEventListener('mousedown', event => {
    let startX = event.clientX, startY = event.clientY

    let up = event => {
        //拖拽结束时记录终点位置，保证在下一次拖拽时能从上一次终点位置开始
        baseX = baseX + (event.clientX - startX)
        baseY = baseY + (event.clientY - startY)
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
    }

    let move = event => {
        let range = getNearest(event.clientX, event.clientY)
        range.insertNode(draggable)
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
})
let container = document.getElementById('container')
container.appendChild(initTextNode())
let ranges = []
calcContainerRange()

document.addEventListener('selectstart', e => e.preventDefault())

function initTextNode(container) {
    let text = []
    for (let i = 0; i < 100; i++) {
        text.push('文字')
    }
    return document.createTextNode(text)
}

function calcContainerRange() {
    const textNode = container.childNodes[0]
    console.log('textNode.textContent', textNode.textContent)
    for (let i = 0; i < textNode.textContent.length; i++) {
        let range = document.createRange()
        range.setStart(textNode, i)
        range.setEnd(textNode, i)
        ranges.push(range)
    }

}

function getNearest(x, y) {
    let min = Infinity
    let nearest = null
    for (let range of ranges) {
        let rect = range.getBoundingClientRect()
        let distance = (rect.x - x) ** 2 + (rect.y - y) ** 2
        if (distance < min) {
            nearest = range
            min = distance
        }
    }
    return nearest
}
