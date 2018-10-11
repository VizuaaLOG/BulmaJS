---
layout: docs
title: Creating a plugin
version: '0.7'
type: documentation
section: 'Getting started'
section_order: 1
page_order: 3
---

BulmaJS uses a simple plugin system allowing anyone to create their own and hook into the BulmaJS core. A BulmaJS plugin is a simple class with some static methods to integrate into the core's API. Within this short guide we're going to create a simple plugin that attaches a click handler to any element with the class `click-me`.

## Setup
The first thing you need to do is create a new folder for your project. In this example we'll our folder `bulmajs-click-me`. You can structure this folder however you like. But we're going to use the structure below.

![Folder structure]({{ site.url }}/assets/images/0.7/creating-a-plugin-folder-structure.png)

+ **dist** This is used for our production ready files once they have processed. We're going to cover this in this guide, there are many webpack (or other bundling tools) guides out there, and they'll do a better job of explaining that.
+ **src** This is where our source files will live.
+ **package.json** This is our node package file