---
layout: docs
title: Modal
type: documentation
version: '0.7'
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
{% include snippets/0.7/modal/create-js.js %}
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
{% include snippets/0.7/modal/create-html.html %}
                {% endhighlight %}
            </li>
        </ul>
    </div>
</div>

## Opening/closing a modal

## Modal type

## Closable

## Adding buttons

## Events