---
layout: docs
title: Modal
type: documentation
version: '0.8'
section: 'Core components'
section_order: 2
stats: true
since_version: 0.1.0
data_api: yes
javascript_api: yes
---

Bulma provides a very versatile modal component. The problem? Modals need Javascript! BulmaJS makes this quick and easy to set up.

The first step is to create the modal instance. Due to the nature of a modal, it will always need some form of Javascript. Due to this, there is no HTML only way of creating a modal instance. However, you can only use Javascript if this suits your project.

## Creating a modal instance
The modal plugin provides two ways to create a new modal. Either entirely through Javascript, using this method all HTML will be dynamically created or with a mixture of HTML and Javascript.

<div class="docs-tabs tabs-wrapper">
    <div class="tabs">
        <ul>
            <li class="is-active">
                <a>Javascript</a>
            </li>

            <li>
                <a>HTML</a>
            </li>
        </ul>
    </div>

    <div class="tabs-content">
        <ul>
            <li class="is-active">
                <div id="modal-example-1" class="code-example">
                    <button id="example-modal-button-1" class="button is-primary">Toggle modal</button>
                </div>

                <script>
                    var modal = Bulma.create('modal', {
                        root: document.getElementById('modal-example-1'),
                        title: 'Modal title 1',
                        body: '<p class="image is-4by3"><img src="https://bulma.io/images/placeholders/1280x960.png" alt=""></p>',
                        buttons: [
                            {
                                label: 'Save changes',
                                classes: ['button', 'is-success'],
                                onClick: function() { alert('Save button pressed'); }
                            },
                            {
                                label: 'Close',
                                classes: ['button', 'is-danger', 'is-outline'],
                                onClick: function() { alert('Close button pressed'); }
                            }
                        ]
                    });

                    document.querySelector('#example-modal-button-1').addEventListener('click', function(e) {
                        modal.open();
                    });
                </script>
                
                {% highlight javascript %}
{% include snippets/0.8/modal/create-js.js %}
                {% endhighlight %}
            </li>

            <li>
                <div class="code-example">
                    <button id="example-modal-button-2" class="button is-primary">Toggle modal</button>

                    <div id="modal-example-2" class="modal">
                        <div class="modal-background"></div>
                        <div class="modal-card">
                            <header class="modal-card-head">
                                <p class="modal-card-title">Modal title 1</p>
                                <button class="delete" aria-label="close"></button>
                            </header>
                            <section class="modal-card-body">
                                    <p class="image is-4by3"><img src="https://bulma.io/images/placeholders/1280x960.png" alt=""></p>
                            </section>
                            <footer class="modal-card-foot">
                                <button class="button is-success">Save changes</button>
                                <button class="button is-danger is-outline">Cancel</button>
                            </footer>
                        </div>
                    </div>
                </div>

                <script>
                    var modalTwo = Bulma.create('modal', {
                        element: document.querySelector('#modal-example-2')
                    });

                    document.querySelector('#example-modal-button-2').addEventListener('click', function(e) {
                        modalTwo.open();
                    });
                </script>


                
                {% highlight html %}
{% include snippets/0.8/modal/create-html.html %}
                {% endhighlight %}
            </li>
        </ul>
    </div>
</div>

## Opening/closing a modal
You want to show your modal right? With BulmaJS that's as easy as calling `open()` on your modal Javascript instance. You can call the reverse `close()` method to close the modal.

## Modal style
Bulma supports a couple of different modal styles. You can control what time is used using the `style` option when creating the modal. By default a modal with use the `card` style. This is the traditional style of a modal and has a header, content area and footer. The alternative value is `image` which will use the image type instead.

## Closable
If your modal is showing important information you may want to restrict how a user closes it. By default a modal can be closed in a few different ways:

1. Clicking the close icon in the top right corner
2. Clicking outside the modal (in the overlay area)
3. Pressing the escape key on their keyboard

A modal can also be closed through a button press, although this is controlled when the modal is being created and is not default behaviour.

A modal can be configured so that it is restricted and can only be closed via the Javascript API. This means the user would have to click one of the buttons you provide to them. To enable this pass the `closable: false` option when creating the modal.

## Adding buttons
Most modals will need the addition of buttons to provide the user with some control over what to do. By default a modal will contain a close button in the upper right corner. However, you can specify additional buttons.

If you choose to create the modal primarily in HTML, then you'll need to manually add event listeners to your buttons. Otherwise, you can use the `buttons` option when creating your modal.

The buttons option takes an array of objects. Each object within the array represents a button. Each object will need to contain the following properties:

+ **Label** This is the text that's shown to the user.
+ **Classes** This is an array of classes used to construct your button.
+ **onClick** This is the function used when the click event is called on the button. The event object is passed as the only argument.

## Events
The modal plugin provides two callback events. `onOpen` and `onClose`. A `onOpen` callback as an option when creating the modal will allow you to detect when a modal is open, `onClose` will detect the reverse. Both events receive the modal instance as their only argument and are called after the `is-active` class has been added/removed from the modal.