Bulma.create('alert', {
    type: 'danger',
    title: 'This is an alert!',
    body: 'Ooohh what button you gonna click?',
    confirm: {
        label: 'Confirm!',
        onClick: function() {
            Bulma.create('alert', {
                title: 'Confirmed',
                body: 'You clicked confirm!'
            });
        },
    },
    cancel: {
        label: 'Cancel!',
        onClick: function() {
            Bulma.create('alert', {
                title: 'Cancelled',
                body: 'You clicked cancel!'
            });
        }
    }
});