const header = document.querySelector('[data-header]')


function onWindowScroll(){
    if(window.scrollY > 20){
        header.style.backgroundColor = 'grey'
    }else{
        header.style.backgroundColor = 'transparent'
    }
}



function setListeners(){
    window.addEventListener('scroll', onWindowScroll)
}

function init(){
    setListeners()
}

export default{
    init
}