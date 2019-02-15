---
layout: docs
title: Alert
type: documentation
version: '0.8'
section: 'Core components'
section_order: 2
stats: true
since_version: 0.8.0
data_api: no
javascript_api: yes
---

There's times where you need to alert something to your visitor, maybe you want to warn them before they delete a record. You could use the build in browser's `alert` method, but that doesn't follow your branding does it?

This alert plugin creates a nice wrapper around the modal plugin already present, with the ability for multiple 'types' and cancel/confirm events, the alert plugin is a great addition to any website.

If you do not need a cancel button, remove the option to set the cancel text!

# Creating an alert dialog
Creating an alert dialog is as easy as creating any other plugin instance within BulmaJS.
<div class="code-example">
    <button id="example-alert-button-1" class="button is-primary">Show alert</button>
</div>

<script>
    document.querySelector('#example-alert-button-1').addEventListener('click', function(e) {
        Bulma.create('alert', {
            type: 'danger',
            title: 'This is an alert!',
            body: 'Ooohh what button you gonna click?',
            confirm: 'Confirm it!',
            cancel: 'Maybe not'
        });
    });
</script>

{% highlight javascript %}
{% include snippets/0.8/alert/create-1.js %}
{% endhighlight %}

# Multiple alert types
Whether you're just informing your user of something, showing them a success message or alerting them to a problem, the alert plugin has you covered. Simply set the `type` option to `danger`, `warning`, `success` or `info` to change the look of the alert modal.

<div class="code-example">
    <button id="example-alert-button-2" class="button is-info">Show info</button>
    <button id="example-alert-button-3" class="button is-success">Show success</button>
    <button id="example-alert-button-4" class="button is-warning">Show warning</button>
    <button id="example-alert-button-5" class="button is-danger">Show danger</button>
</div>

<script>
    document.querySelector('#example-alert-button-2').addEventListener('click', function(e) {
        Bulma.create('alert', {
            type: 'info',
            title: 'This is an alert!',
            body: 'Ooohh what button you gonna click?',
            confirm: 'Confirm it!',
            cancel: 'Maybe not'
        });
    });

    document.querySelector('#example-alert-button-3').addEventListener('click', function(e) {
        Bulma.create('alert', {
            type: 'success',
            title: 'This is an alert!',
            body: 'Ooohh what button you gonna click?',
            confirm: 'Confirm it!',
            cancel: 'Maybe not'
        });
    });

    document.querySelector('#example-alert-button-4').addEventListener('click', function(e) {
        Bulma.create('alert', {
            type: 'warning',
            title: 'This is an alert!',
            body: 'Ooohh what button you gonna click?',
            confirm: 'Confirm it!',
            cancel: 'Maybe not'
        });
    });

    document.querySelector('#example-alert-button-5').addEventListener('click', function(e) {
        Bulma.create('alert', {
            type: 'danger',
            title: 'This is an alert!',
            body: 'Ooohh what button you gonna click?',
            confirm: 'Confirm it!',
            cancel: 'Maybe not'
        });
    });
</script>

# Confirm / Cancel events
What's the point in a popup if you can't use it for input? The alert plugin can take an `onConfirm` and/or `onCancel` option. This will be a function that's called when the user clicks the confirm button or the cancel button. Try it!

<div class="code-example">
    <button id="example-alert-button-6" class="button is-primary">Show alert</button>
</div>

<script>
    document.querySelector('#example-alert-button-6').addEventListener('click', function(e) {
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
    });
</script>

{% highlight javascript %}
{% include snippets/0.8/alert/events-1.js %}
{% endhighlight %}