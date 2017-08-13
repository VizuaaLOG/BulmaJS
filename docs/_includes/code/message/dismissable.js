Bulma.create('message', {
    body: 'I am always visible until you close me manually.',
    parent: document.getElementById('dismissable-message'),
    isDismissable: true
});
