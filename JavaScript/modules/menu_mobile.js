const menuMobile = document.querySelector('[data-menu-mobile]')


function toggleMenu(){
    if(event.type === 'touchstart') event.preventDefault()
    
}


function setListeners(){
    window.addEventListener('click', toggleMenu )
}



function init(){
    setListeners()
}

export default{
    init
}
