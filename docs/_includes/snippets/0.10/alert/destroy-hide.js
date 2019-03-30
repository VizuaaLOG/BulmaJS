Bulma.create('alert', {
    type: 'danger',
    title: 'Alert',
    body: 'Try clicking the buttons!',
    confirm: {
        label: 'Close but do not destroy',
        destroy: false
    },
    cancel: {
        label: 'Do nothing!',
        close: false,
        destroy: false
    }
});