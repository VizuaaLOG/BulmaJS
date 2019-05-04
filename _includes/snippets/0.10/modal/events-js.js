let modal = Bulma.create('modal', {element: document.querySelector('#example-modal')});
let btn = document.querySelector('#example-modal-button');
let visible = false;
let closeButtons = document.querySelectorAll('.button-close');

btn.addEventListener('click', function() {
    if(visible) {
        modal.close();
    } else {
        modal.open();
    }

    visible = !visible;
});

for(let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click', function() {
        modal.close();
        visible = !visible;
    });
}