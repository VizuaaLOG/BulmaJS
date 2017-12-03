Bulma.create('message', {
    title: "Manual dismiss only",
    body: 'I am always visible until you close me manually.',
    parent: document.getElementById('dismissable-message'),
    isDismissable: true
});
