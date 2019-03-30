---
layout: docs
title: Alert
type: documentation
version: '0.10'
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
What's the point in a popup if you can't use it for input? You can specify an `onClick` handler function for both the `confirm` and `cancel` buttons by providing the `onClick` property.

<div class="code-example">
    <button id="example-alert-button-6" class="button is-primary">Show alert</button>
</div>

<script>
    document.querySelector('#example-alert-button-6').addEventListener('click', function(e) {
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
    });
</script>

{% highlight javascript %}
{% include snippets/0.8/alert/events-1.js %}
{% endhighlight %}

# Custom button classes

<div class="tags has-addons">
    <span class="tag is-success">Since</span>
    <span class="tag">0.9.0</span>
</div>

If you would like to adjust the style of the buttons, maybe changing them to include the `is-outlined` class you can do so by providing the `cancel` or `confirm` options with an object. The new object will have `label` property, this will the text to display within the button, and an array of `classes`.

<div class="code-example">
    <button id="example-alert-button-8" class="button is-primary">Show alert</button>
</div>

<script>
    document.querySelector('#example-alert-button-8').addEventListener('click', function(e) {
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
    });
</script>

{% highlight javascript %}
{% include snippets/0.10/alert/classes.js %}
{% endhighlight %}

# Hiding the header

<div class="tags has-addons">
    <span class="tag is-success">Since</span>
    <span class="tag">0.9.0</span>
</div>

You can choose to not show the alert's header by setting the `showHeader` option to `false`.

<div class="notification is-info">
    Bulma's card modal does not support this as an option, so will need a small custom CSS snippet to add rounded corners to the top of the modal.
    
    {% highlight css %}{% include snippets/0.10/alert/header.css %}{% endhighlight %}
</div>

<div class="code-example">
    <button id="example-alert-button-7" class="button is-primary">Show alert</button>
</div>

<script>
    document.querySelector('#example-alert-button-7').addEventListener('click', function(e) {
        Bulma.create('alert', {
            type: 'danger',
            body: 'See no header',
            confirm: 'Awesome!',
            showHeader: false
        });
    });
</script>

{% highlight javascript %}
{% include snippets/0.10/alert/header.js %}
{% endhighlight %}

# Destroying/closing the alert

<div class="tags has-addons">
    <span class="tag is-success">Since</span>
    <span class="tag">0.9.0</span>
</div>

By default the alert will destroy itself when closed, removing all HTML and nulling it's variables. You may not want to use this behaviour.

You can specify if a button closes and/or destroys the alert instance by specifying the `close` or `destroy` properties to the `confirm` or `close` objects.

<div class="code-example">
    <button id="example-alert-button-9" class="button is-primary">Show alert</button>
</div>

<script>
    document.querySelector('#example-alert-button-9').addEventListener('click', function(e) {
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
    });
</script>

{% highlight javascript %}
{% include snippets/0.10/alert/destroy-hide.js %}
{% endhighlight %}

If you save the alert instance to a variable, you can then show it again using it's `show` method.