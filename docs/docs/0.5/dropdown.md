---
layout: docs
title: Dropdown
type: documentation
version: '0.5'
section: 'Core components'
section_order: 2
stats: true
since_version: 0.1.0
data_api: true
javascript_api: no
---

Bulma provides a button dropdown component. By default, this component needs Javascript to show/hide the dropdown when the button is clicked/tapped. You can add the `is-hover` class to show/hide the dropdown when the user places there mouse over the button.

However, the default behaviour for the drop-down component requires a sprinkle of Javascript. The BulmaJS dropdown plugin will allow you to easily allow a dropdown to be shown/hidden via a mouse click.

All you need to do is simply include BulmaJS and the BulmaJS dropdown plugin in your project. We'll handle the rest!

<div class="dropdown">
    <div class="dropdown-trigger">
        <button class="button is-info" aria-haspopup="true" aria-controls="dropdown-menu2">
            <span>Content</span>
            <span class="icon is-small">
                <i class="fa fa-angle-down" aria-hidden="true"></i>
            </span>
        </button>
    </div>
    <div class="dropdown-menu" id="dropdown-menu2" role="menu">
        <div class="dropdown-content">
            <div class="dropdown-item">
                <p>You can insert <strong>any type of content</strong> within the dropdown menu.</p>
            </div>
            <hr class="dropdown-divider">
            <div class="dropdown-item">
                <p>You simply need to use a <code>&lt;div&gt;</code> instead.</p>
            </div>
            <hr class="dropdown-divider">
            <a href="#" class="dropdown-item">
                This is a link
            </a>
        </div>
    </div>
</div>