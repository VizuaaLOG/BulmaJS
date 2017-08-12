Bulma.create('notification', {
    body: 'I will be removed from the page and cease to exist when I am dismissed.',
    parent: document.getElementById('dismissable-notification'),
    isDismissable: true,
    destroyOnDismiss: false
});
