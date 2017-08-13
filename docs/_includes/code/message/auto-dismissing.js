Bulma.create('message', {
    title: 'Message title',
    body: 'I will be removed from the page and cease to exist when I am dismissed.',
    parent: document.getElementById('auto-dismissing-message'),
    isDismissable: true,
    dismissInterval: 3000
});
