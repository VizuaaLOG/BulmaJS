---
layout: docs
title:  Notification
type: documentation
version: '0.5'
section: 'Core components'
section_order: 2
stats: true
since_version: 0.1.0
data_api: true
javascript_api: yes
---

The notification component can be used to provide a note to the user. One use case could be to notify the user of a successful form post. If you want to permanently display the notification without any interactivity then the default behaviour provided by Bulma will be perfect. However, should you wish to create notifications via Javascript, automatically dismiss notifications or provide a dismiss button you'll need BulmaJS's notification component?

## Creating a notification
BulmaJS doesn't stop you from creating a notification via HTML. In fact, this is the easiest way to get started. However, in some situations, you may need to create your notification via Javascript. With BulmaJS this is easy!

{% highlight javascript %}
Bulma.create('notification', {
    body: 'I am always visible until you close me manually.',
    parent: document.getElementById('dismissable-notification'),
});
{% endhighlight %}

In the above example, we're providing a `body` and `parent`. `body` is self-explanatory, this will be placed in the same position within the notification component. `parent` is where you supply the parent element. This element will be the container for this notification. The notification will be appended to its parent once it has been constructed.

You can also supply additional options to a notification when you're creating it. These include:

- `isDismissable` - This is a boolean value and determines if the close button is added to the notification.
- `dismissInterval` - This is an integer and specifies the number of milliseconds the notification is visible before it is automatically hidden.
- `destroyOnDismiss` - This is a boolean value and determines if the notification should be removed from the DOM when it is dismissed via the button or automatically after the `dismissInterval` has passed.
- `color` - This is a string value and determines the color of the notification. Any color property from Bulma is supported such as `success` or `info`. This simply adds a class to the element for example `is-success` and so can be used with your own color modifiers.
- `size` - This is a string value and determines the size of the notification. Any size property from Bulma is supported such as `large` or `small`. This simply adds a class to the element for example `is-large` and so can be used with your own size modifiers.

## Showing/hiding a notification
In some situations, you may wish to show/hide a notification via Javascript. Creating a notification via the Javascript API returns the `notification` object allowing you to call the `show()` and `hide()` methods on it.

{% highlight javascript %}
Bulma.create('notification', {
    body: 'I am always visible until you close me manually.',
    parent: document.getElementById('dismissable-notification'),
}).show();
{% endhighlight %}

# Without Javascript
If you would rather stay away from writing your own Javascript, you don't have too! BulmaJS extends the notification component's HTML to allow you to specify the options via data attributes. The only one you will need to use is the `data-dismiss-interval` this will take an integer of the number of milliseconds to wait before hiding the notification.

If you would like to provide the user with the ability to dismiss a notification, simply include the delete button!

<div class="code-example">
    <div class="notification is-success">
        <button class="delete"></button>
        I have to be manually dismissed.
    </div>
</div>