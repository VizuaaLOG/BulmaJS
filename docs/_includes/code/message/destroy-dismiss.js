Bulma.create('message', {
    title: 'Message',
    body: 'I will be removed from the page and cease to exist when I am dismissed.',
    parent: document.getElementById('dismissable-message'),
    isDismissable: true,
    destroyOnDismiss: false
});
