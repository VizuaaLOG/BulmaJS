var modal = Bulma.create('modal', {
    title: 'Modal title 1',
    body: '<p class="image is-4by3"><img src="https://bulma.io/images/placeholders/1280x960.png" alt=""></p>',
    buttons: [
        {
            label: 'Save changes',
            classes: ['button', 'is-success'],
            onClick: function() { alert('Save button pressed'); }
        },
        {
            label: 'Close',
            classes: ['button', 'is-danger', 'is-outline'],
            onClick: function() { alert('Close button pressed'); }
        }
    ]
});