const teste = document.querySelector('[teste]')


function tss(){
    teste.style.backgroundColor = 'blue'
}

function setListeners(){
    window.addEventListener('click', tss)
}



function init(){
    setListeners()
}

export default{
    init
}
