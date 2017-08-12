Bulma.create('notification', {
    body: 'I am always visible until you close me manually.',
    parent: document.getElementById('dismissable-notification'),
    isDismissable: true
});
