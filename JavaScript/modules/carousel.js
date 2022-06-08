
const carouselList = document.querySelector('[data-carousel="list"]')
const carouselItem = document.querySelectorAll('[data-carousel="item"]')
const btnNext = document.querySelector('[data-carousel="btn-next"]')
const btnPrevious = document.querySelector('[data-carousel="btn-previous"]')
let itemsPerSlide = 5

const state = {
    mouseDownPosition: 0,
    movement:0,
    lastTranslatePosition: 0,
    currentSlidePosition: 0,
    currentItemIndex: 0,
    currentSlideIndex: 0
}

const preventDefault = (event) => {
    event.preventDefault()
}

const translateSlide = (position) => {
    state.lastTranslatePosition = position
    carouselList.style.transform = `translateX(${position}px)`
}

const getCenterPosition = (slideIndex) => {
    const item = carouselItem[state.currentItemIndex] 
    const itemWidth = item.offsetWidth
    const bodyWidth = document.body.clientWidth
    const slideWidth = itemWidth * itemsPerSlide
    const margin = (bodyWidth - slideWidth) / 2
    return margin - (slideWidth * slideIndex)
}

const getLastSlideIndex = () => {
    const {carouselItem} = collectionData
    [currentCollectionIndex]
    const lastItemIndex = carouselItem.length - 1
    return Math.floor(lastItemIndex / itemsPerSlide)
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
    const {state}= collectionData[currentCollectionIndex]
    const lastSlideIndex = getLastSlideIndex()
    if(state.currentSlideIndex < lastSlideIndex){
       setVisibleSlide(state.currentSlideIndex + 1) 
    }else{
        setVisibleSlide(state.currentSlideIndex) 
    }
}


const onMouseDown = (event, itemIndex) => {
    const {state} = collectionData[currentCollectionIndex]
    const item = event.currentTarget
    state.currentItemIndex = itemIndex
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
    if(state.movement > 150){
        backwardSlide()
    }else if (state.movement < -150){
        forwardSlide()
    }else{
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
        const link = item.querySelector('.center-carousel__link')
        link.addEventListener('click', preventDefault)
        item.addEventListener('dragstart', preventDefault)
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




