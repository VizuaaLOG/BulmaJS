---
layout: docs
title: Usage
version: '0.9'
type: documentation
section: 'Getting started'
section_order: 1
page_order: 2
---

BulmaJS is fairly straightforward to use. There are two ways you can create and interact with BulmaJS plugins. Some plugins may only implement one of these methods, depending on the plugin. However, this will be visually displayed on the plugins documentation page.

### Using the DOM
Most BulmaJS plugins have a DOM API that will allow you to create and customise the plugins. Creating a plugin instance via the DOM API is as simple as creating the Bulma component via HTML and classes. The BulmaJS plugin will then pick up the element once it is loaded and set up all of the necessary features.

For example, the Navbar plugin requires no additional Javascript, simply import the plugin and as long as you have the correct HTML, as per Bulma's documentation, you will have a responsive navigation menu.

Some plugins will also provide additional options you can add to the element through data attributes. These will be equivalent to the options they provide within Javascript and will allow you to customise the plugin without needing to write any additional Javascript code.

### Using Javascript
If you would prefer to create the plugin instances within Javascript, you can do this very easily. Plugins that support the Javascript API can be created by using the `Bulma.create` method. This method will take the plugin key, such as `modal`, and an object containing the options for that plugin. The documentation page for a plugin will explain the options it has available.

For example, using `Bulma.create` you can easily link a Javascript modal instance to a Modal element:

{% highlight javascript %}
import Modal from '@vizuaalog/bulmajs/src/plugins/Modal';

var modal = Modal.create({
    element: document.querySelector('#myModal')
});

// You can now call methods on modal
modal.open();
{% endhighlight %}

You can find more information on how to use the Modal plugin by visiting the Modal documentation page.

<div>
    <div class="columns">
        <div class="column is-6"></div>
        <div class="column is-6">
            <a class="button is-block is-large is-primary is-outlined" href="4-creating-a-plugin">Creating a plugin <span class="fas fa-arrow-right"></span></a>
        </div>
    </div>
</div>