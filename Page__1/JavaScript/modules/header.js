const header = document.querySelector('[data-header]')


function onWindowScroll(){
    if(window.scrollY > 20){
        header.style.backgroundColor = '#478dae'
        
    }else{
        header.style.backgroundColor = 'white'
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