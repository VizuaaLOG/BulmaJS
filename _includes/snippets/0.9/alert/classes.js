Bulma.create('alert', {
    type: 'danger',
    title: 'Ooooo custom',
    body: 'Classes...',
    confirm: {
        label: 'Awesome',
        classes: ['is-outlined']
    },
    cancel: {
        label: 'See',
        classes: ['is-primary', 'is-rounded']
    }
});