---
layout: docs
title: Navbar
type: documentation
version: '0.9'
section: 'Core components'
section_order: 2
stats: true
since_version: 0.1.0
data_api: true
javascript_api: false
---

The navbar plugin provides a range of different functionality for the Bulma navbar. By simply including the plugin you'll get the mobile navigation functionality, no configuration is required.

<div class="code-example">
    <nav class="navbar is-transparent">
        <div class="navbar-brand">
            <a class="navbar-item" href="https://bulma.io">
                <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
            </a>
            <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>

        <div id="navbarExampleTransparentExample" class="navbar-menu">
            <div class="navbar-start">
                <a class="navbar-item" href="https://bulma.io/">
                    Home
                </a>
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link" href="/documentation/overview/start/">
                        Docs
                    </a>
                    <div class="navbar-dropdown is-boxed">
                        <a class="navbar-item" href="/documentation/overview/start/">
                            Overview
                        </a>
                        <a class="navbar-item" href="https://bulma.io/documentation/modifiers/syntax/">
                            Modifiers
                        </a>
                        <a class="navbar-item" href="https://bulma.io/documentation/columns/basics/">
                            Columns
                        </a>
                        <a class="navbar-item" href="https://bulma.io/documentation/layout/container/">
                            Layout
                        </a>
                        <a class="navbar-item" href="https://bulma.io/documentation/form/general/">
                            Form
                        </a>
                        <hr class="navbar-divider">
                        <a class="navbar-item" href="https://bulma.io/documentation/elements/box/">
                            Elements
                        </a>
                        <a class="navbar-item is-active" href="https://bulma.io/documentation/components/breadcrumb/">
                            Components
                        </a>
                    </div>
                </div>
            </div>

            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="field is-grouped">
                        <p class="control">
                            <a class="bd-tw-button button" data-social-network="Twitter" data-social-action="tweet" data-social-target="http://localhost:4000"
                                target="_blank" href="https://twitter.com/intent/tweet?text=Bulma: a modern CSS framework based on Flexbox&amp;hashtags=bulmaio&amp;url=http://localhost:4000&amp;via=jgthms">
                                <span class="icon">
                                    <i class="fab fa-twitter"></i>
                                </span>
                                <span>
                                    Tweet
                                </span>
                            </a>
                        </p>
                        <p class="control">
                            <a class="button is-primary" href="https://github.com/jgthms/bulma/releases/download/0.7.1/bulma-0.7.1.zip">
                                <span class="icon">
                                    <i class="fas fa-download"></i>
                                </span>
                                <span>Download</span>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</div>

## Sticky navbar
Since 0.6.1 Bulma has provided a `is-fixed-top` class for the navbar, along with `has-navbar-fixed-top` for the html/body elements. This allows you to fix the navbar to the top of the page when scrolling. However, what if your navbar is not directly at the top? You need to be able to offset the sticky feature.

Since `0.7.0` BulmaJS has provided the functionality to do just this! First, specify the `data-sticky` attribute on your navbar. This will enable the event listener for scroll, by default the offset is set to `0` which does nothing extra than just adding the class to the element.

You can control the offset of the navbar using `data-sticky-offset` this access a number and is the number of pixels the user needs to scroll before the navbar sticks to the top.

You can also add `data-sticky-shadow` to your navbar element, this will add the `has-shadow` class to the navbar when it becomes sticky.

## Hide the navbar when scrolling
It can sometimes be useful to hide the navbar when your user is scrolling down, and then show it again when scrolling up. As of `0.7.0` the navbar plugin provides this functionality. To enable it, add the `data-hide-on-scroll` attribute to your navbar element. Do note this also needs `data-sticky` to be enabled as well.

You can specify the `tolerance` before the navbar is hidden/shown by adding a `data-tolerance` attribute. This accepts an integer and is the number of pixels between each scroll event. I.e. the 'force' required to hide/show the navbar.

When the navbar is hidden the `is-hidden-scroll` class is added to it, allowing you to detect this via CSS and hide the navbar. This also allows you to add CSS animations. An example implemention would be:

```css
.navbar {
    transform: translateY(0);
    transition: transform 0.2s ease-in-out;
}

.navbar.is-hidden-scroll {
    transform: translateY(-100%);
}
```