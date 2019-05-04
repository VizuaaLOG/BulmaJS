Bulma.create('alert', {
    type: 'danger',
    title: 'This is an alert!',
    body: 'Ooohh what button you gonna click?',
    confirm: 'Confirm!',
    cancel: 'Cancel!',
    onConfirm: function() {
        Bulma.create('alert', {
            title: 'Confirmed',
            body: 'You clicked confirm!'
        });
    },
    onCancel: function() {
        Bulma.create('alert', {
            title: 'Cancelled',
            body: 'You clicked cancel!'
        });
    }
});