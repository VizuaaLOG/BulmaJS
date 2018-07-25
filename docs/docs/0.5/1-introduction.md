---
layout: docs
title: Introduction
version: '0.5'
type: documentation
section: 'Getting started'
section_order: 1
page_order: 0
---

BulmaJS is a Javascript extension to the modern CSS framework Bulma. BulmaJS provides a range of different Javascript plugins that add interactivity to some Bulma components, with a simple API, a range of configuration options and no dependencies!

## Plugins
Every 'component' in BulmaJS is its own self-contained plugin. All that is required is the BulmaJS core, this provides basic functionality for each plugin to register itself and also handles the initial DOM parsing and creating of plugins. The core also contains common methods used throughout the other plugins.

You can then build your own bundle by including the plugins you need. The core will be automatically included and never duplicated in your final package.

## ES6
BulmaJS is built using modern Javascript using ECMAScript 6. This doesn't mean you can't use it you do not use ES6 though! All plugins are pre-compiled into self-contained ES5 distribution files, along with a 'kitchen sink' version which contains all plugins.

We would recommend building your own bundle though, as this will provide the most flexibility.

<div>
    <div class="columns">
        <div class="column is-6"></div>
        <div class="column is-6">
            <a class="button is-block is-large is-primary is-outlined" href="2-installation">Installation <span class="fas fa-arrow-right"></span></a>
        </div>
    </div>
</div>