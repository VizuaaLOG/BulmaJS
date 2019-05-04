---
layout: docs
title: Accordion
type: documentation
version: '0.7'
section: 'Wikiki components'
section_order: 3
stats: true
since_version: 0.3.0
data_api: false
javascript_api: true
---

<link rel="stylesheet" href="{{ site.url }}/assets/css/bulma-accordion.css">

<div class="notification is-info">
    This is a BulmaJS ES6 plugin to integrate the JS functionality needed to use <a href="https://wikiki.github.io/components/accordion/" target="_blank">Wikiki's Accordion Bulma extension</a>. BulmaJS does not come with the CSS styling, this will need to be downloaded separately.
</div>

To add the Javascript functionality to the accordion HTML, you simply need to create a BulmaJS accordion instance padding the accordion as the `element` option.

{% highlight javascript %}
    Bulma.create('accordion', {
        element: document.querySelector('.accordions')
    });
{% endhighlight %}

<div class="code-example">
    <section class="accordions" id="accordion-demo1">
        <article class="accordion is-active">
            <div class="accordion-header toggle">
                <p>Hello World</p>
            </div>
            <div class="accordion-body">
                <div class="accordion-content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus
                    ac ex sit amet fringilla. Nullam gravida purus diam, et dictum
                    <a>felis venenatis</a> efficitur. Aenean ac
                    <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor
                    urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis
                    sodales sem.
                </div>
            </div>
        </article>
        <article class="accordion">
            <div class="accordion-header">
                <p>Hello World</p>
                <button class="toggle" aria-label="toggle"></button>
            </div>
            <div class="accordion-body">
                <div class="accordion-content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus
                    ac ex sit amet fringilla. Nullam gravida purus diam, et dictum
                    <a>felis venenatis</a> efficitur. Aenean ac
                    <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor
                    urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis
                    sodales sem.
                </div>
            </div>
        </article>
        <article class="accordion">
            <div class="accordion-header">
                <p>Hello World</p>
                <button class="toggle" aria-label="toggle"></button>
            </div>
            <div class="accordion-body">
                <div class="accordion-content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus
                    ac ex sit amet fringilla. Nullam gravida purus diam, et dictum
                    <a>felis venenatis</a> efficitur. Aenean ac
                    <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor
                    urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis
                    sodales sem.
                </div>
            </div>
        </article>
    </section>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        Bulma.create('accordion', {
            element: document.querySelector('.accordions')
        });
    });
</script>