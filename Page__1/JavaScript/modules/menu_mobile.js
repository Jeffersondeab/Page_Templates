const menuMobile = document.querySelector('[data-btn-mobile]')


function toggleMenu(event){
    if(event.type === 'touchstart') event.preventDefault()
    const navMobile = document.querySelector('[data-nav-menu]');
    navMobile.classList.toggle('active');
    const active = navMobile.classList.contains('active');
    event.currentTarget.setAttribute('aria-axpanded', active);
    if(active){
        event.currentTarget.setAttribute('aria-label','fechar menu');
    }else{
        event.currentTarget.setAttribute('aria-label','abrir menu')
    }
}


function setListeners(){

    menuMobile.addEventListener('click', toggleMenu);
    menuMobile.addEventListener('touchstart',toggleMenu);
    
}



function init(){
    setListeners()
}

export default{
    init
}
