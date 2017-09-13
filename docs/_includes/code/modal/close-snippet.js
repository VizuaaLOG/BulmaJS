let modal = Bulma.create('modal', {
    element: document.querySelector('.modal')
});

document.querySelectorAll('.modal-button').forEach(function(button) {
    button.addEventListener('click', function() {
        modal.close();
    })
});
