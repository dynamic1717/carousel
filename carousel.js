const imgs = document.querySelector('#imgs')

const img = document.querySelectorAll('#imgs img')

const buttonsContainer = document.querySelector('.buttons-container')

const dotsContainer = document.querySelector('.dots-container')

let index = 0
let auto = false
let timer


function generateDots() {
    for (let i = 0; i < img.length; i++) {
        let dot = document.createElement('div')
        dot.classList.add('dot')
        dotsContainer.append(dot)
    }
    changeCurrentDot(index)
}

function changeCurrentDot(index) {
    for (let i = 0; i < dotsContainer.children.length; i++) {
        dotsContainer.children[i].classList.remove('dot-current')
    }
    dotsContainer.children[index].classList.add('dot-current')
}

function slide() {
    index++
    if (index > img.length - 1) {
        index = 0
    }
    imgs.style.transform = `translateX(${-index * 500}px)`
    changeCurrentDot(index)
}

function reverseSlide() {
    index--
    if (index < 0) {
        index = img.length - 1
    }
    imgs.style.transform = `translateX(${-index * 500}px)`
    changeCurrentDot(index)
}


buttonsContainer.addEventListener('click', (e) => {
    if (e.target.nodeName !== 'BUTTON') return false

    let btn = e.target.closest('button')

    switch (btn.dataset.slide) {
        case 'prev':
            reverseSlide()
            break

        case 'next':
            slide()
            break
            
        case 'auto':
            if (!auto) {
                timer = setInterval(slide, 2000)
                auto = true
            } else {
                clearInterval(timer)
                auto = false
            }
            break
    }
})

dotsContainer.addEventListener('click', (e) => {
    if (e.target.nodeName !== 'DIV') return false

    index = Array.from(dotsContainer.children).indexOf(e.target)

    if (index < 0) {
        return false
    } else {
        imgs.style.transform = `translateX(${-index * 500}px)`
    }
    changeCurrentDot(index)
})

window.onload = generateDots