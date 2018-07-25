---
layout: docs
title: File
type: documentation
version: '0.6'
section: 'Core components'
section_order: 2
stats: true
since_version: 0.1.0
data_api: true
javascript_api: no
---

Bulma provides custom styling for the file input. This is great for unifying the design of your form between browsers. One great addon to the Bulma file component is the `file-name` element. This provides a place for you to insert the name of the file you're uploading.

The file plugin can be used to easily add the file name detection to your file component. All you need to do is include BulmaJS and the File component into your page. Everything will then taken care of. You can even include a placeholder value in the filename element, this will then be overridden once a file is deleted.

<div class="code-example">
    <div class="file has-name is-boxed">
        <label class="file-label">
            <input class="file-input" type="file" name="resume">
            <span class="file-cta">
                <span class="file-icon">
                    <i class="fa fa-upload"></i>
                </span>
                <span class="file-label">
                    Choose a file…
                </span>
            </span>
            <span class="file-name">Please select a file.</span>
        </label>
    </div>
</div>

But what about a multiple input field? If you want to use the Bulma file component to upload multiple files, just include the `multiple` attribute like you would with a standard HTML form. The file plugin will detect this and say `x files selected`.

<div class="code-example">
    <div class="file has-name is-boxed">
        <label class="file-label">
            <input class="file-input" type="file" name="resume" multiple>
            <span class="file-cta">
                <span class="file-icon">
                    <i class="fa fa-upload"></i>
                </span>
                <span class="file-label">
                    Choose a file…
                </span>
            </span>
            <span class="file-name">Please select a file.</span>
        </label>
    </div>
</div>