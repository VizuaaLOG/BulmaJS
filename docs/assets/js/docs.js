var menu = document.querySelector('#navigation-menu');

document.addEventListener('scroll', function(event) {
    if(event.target.scrollingElement.scrollTop > 1) {
        menu.classList.add('is-scroll');
    } else {
        menu.classList.remove('is-scroll');
    }
});