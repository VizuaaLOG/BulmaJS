---
layout: docs
title: Modal
type: documentation
version: '0.5'
section: 'Core components'
section_order: 2
stats: true
since_version: 0.1.0
data_api: no
javascript_api: yes
---

Bulma provides a very versatile modal component. The problem? Modals need Javascript! BulmaJS makes this quick and easy to set up.

To start you'll need to create your modal and the element that will show/hide the modal. In this example, we'll use a button.

<div class="code-example">
    <button id="example-modal-button" class="button is-primary">Toggle modal</button>
</div>

<div id="example-modal" class="modal">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Modal title</p>
      <button class="delete" aria-label="close"></button>
    </header>
    <section class="modal-card-body">
      Modal content
    </section>
    <footer class="modal-card-foot">
      <button class="button-close button is-success">Save changes</button>
      <button class="button-close button">Cancel</button>
    </footer>
  </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        let modal = Bulma.create('modal', {element: document.querySelector('#example-modal')});
        let btn = document.querySelector('#example-modal-button');
        let visible = false;
        let closeButtons = document.querySelectorAll('.button-close');

        btn.addEventListener('click', function() {
            if(visible) {
                modal.close();
            } else {
                modal.open();
            }

            visible = !visible;
        });

        for(let i = 0; i < closeButtons.length; i++) {
            closeButtons[i].addEventListener('click', function() {
                modal.close();
                visible = !visible;
            });
        }
    });
</script>

You then need to set up the event listeners for your button. For example, below we link up our button to open the modal and the two buttons within the modal to close it.

{% highlight javascript %}
    let modal = Bulma.create('modal', {element: document.querySelector('#example-modal')});
    let btn = document.querySelector('#example-modal-button');
    let visible = false;
    let closeButtons = document.querySelectorAll('.button-close');

    btn.addEventListener('click', function() {
        if(visible) {
            modal.close();
        } else {
            modal.open();
        }

        visible = !visible;
    });

    for(let i = 0; i < closeButtons.length; i++) {
        closeButtons[i].addEventListener('click', function() {
            modal.close();
            visible = !visible;
        });
    }
{% endhighlight %}