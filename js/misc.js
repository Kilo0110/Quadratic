menuBtn = document.querySelector('#hamburger')
menu = document.querySelector('.menu')

menuBtn.addEventListener('click', ()=> {
    menuBtn.classList.toggle('clicked')
    menu.classList.toggle('open')
})