menuBtn = document.querySelector('#hamburger')
menuWrapper = document.querySelector('.wrapper')
overlay = document.querySelector('#overlay')

menuBtn.addEventListener('click', ()=> {
    menuBtn.classList.toggle('clicked')
    menuWrapper.classList.toggle('show')
    overlay.classList.toggle('show')
})

overlay.addEventListener('click', ()=> {
    overlay.classList.toggle('show')
    menuWrapper.classList.toggle('show')
    menuBtn.classList.toggle('clicked')
})