
const carouselList = document.querySelector('[data-carousel="list"]')
const carouselItem = document.querySelectorAll('[data-carousel="item"]')
const btnNext = document.querySelector('[data-carousel="btn-next"]')
const btnPrevious = document.querySelector('[data-carousel="btn-previous"]')
 


const state = {
    mouseDownPosition: 0,
    movement:0,
    lastTranslatePosition: 0,
    currentSlidePosition: 0,
    currentItemIndex: 0,
    currentSlideIndex: 0
}

 

const translateSlide = (position) => {
    state.lastTranslatePosition = position
    carouselList.style.transform = `translateX(${position}px)`
}

const getCenterPosition = (slideIndex) => {
    const item = carouselItem[state.currentItemIndex] 
    const itemWidth = item.offsetWidth
    const bodyWidth = document.body.clientWidth
    const slideWidth = itemWidth * 6
    const margin = (bodyWidth - slideWidth) / 2
    return margin - (slideWidth * slideIndex)
}



 

const animateTransition = (active) =>{
    if(active){
        carouselList.style.transition = 'transform .3s'
    }else{
        carouselList.style.removeProperty('transition')
    }
}

const setVisibleSlide = (slideIndex) => {
    state.currentSlideIndex = slideIndex
    const centerPosition = getCenterPosition(slideIndex)
    animateTransition(true)
    translateSlide(centerPosition)
}

const backwardSlide = () => {
    if(state.currentSlideIndex > 0){
       setVisibleSlide(state.currentSlideIndex - 1) 
    }else{
        setVisibleSlide(state.currentSlideIndex) 
    }
}

const forwardSlide = () => {
    const lastItemIndex = carouselItem.length - 1
    const lastSlideIndex = Math.floor(lastItemIndex / 5)
    if(state.currentSlideIndex < lastSlideIndex){
       setVisibleSlide(state.currentSlideIndex + 1) 
    }else{
        setVisibleSlide(state.currentSlideIndex) 
    }
}


const onMouseDown = (event, index) => {
    const item = event.currentTarget
    state.currentItemIndex = index
    state.mouseDownPosition = event.clientX
    state.currentSlidePosition = event.clientX - state.lastTranslatePosition
    animateTransition(false)
    item.addEventListener('mousemove', onMouseMove)
}

const onMouseMove = (event) => {
    state.movement = event.clientX - state.mouseDownPosition
    const position = event.clientX -state.currentSlidePosition
    translateSlide(position)
}




const onMouseUp = (event) => {
    if(state.movement < carouselItem){
        setVisibleSlide(state.currentSlideIndex)
    }else if(state.movement >  - 10){
        setVisibleSlide(state.currentSlideIndex)
    } 
    const item = event.currentTarget
    item.removeEventListener('mousemove', onMouseMove)
}


const onMouseLeave = (event) => {
    const item = event.currentTarget
    item.removeEventListener('mousemove', onMouseMove)
}




const setListeners = () => {
    btnNext.addEventListener('click', forwardSlide)
    btnPrevious.addEventListener('click', backwardSlide)
    carouselItem.forEach((item, index) => {
        item.addEventListener('mousedown', (event) => {
                onMouseDown(event, index)
            }),
        
        item.addEventListener('mouseup', onMouseUp)
        item.addEventListener('mouseleave', onMouseLeave)
    })
}






const init = () => {
    setListeners()
    setVisibleSlide(0)
}


export default {
    init
}




