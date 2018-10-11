# 0.7.0 (Unreleased)
+ **Feature** [#27](https://github.com/VizuaaLOG/BulmaJS/issues/27) Modals can now be closed by pressing the 
`escape` key.
+ **Feature** [#27](https://github.com/VizuaaLOG/BulmaJS/issues/27) Modals can now be closed by clicking outside of an open modal.
+ **Feature** [#27](https://github.com/VizuaaLOG/BulmaJS/issues/27) When a modal is opening the `is-clipped` class is applied to the `body` element.
+ **Feature** Added a new `findElement` helper method to the BulmaJS core. This method will allow plugins to easily normalise an arugment that needs to be either an HTMLElement or a query selector string.
+ **Feature** [#27](https://github.com/VizuaaLOG/BulmaJS/issues/27) Rewrite the modal plugin, providing a new functionality, options and a full Javascript API.
+ **Feature** [#50](https://github.com/VizuaaLOG/BulmaJS/issues/50) Allow multiple plugins to be attached to a single class.
+ **Tweak** [#51](https://github.com/VizuaaLOG/BulmaJS/pull/51) Thanks to [apecell](https://github.com/apecell) the file plugin now supports drag and drop.
+ **Bug** [#27](https://github.com/VizuaaLOG/BulmaJS/issues/27) `closeButton` event is now correctly removed when destroying a modal.
+ **Bug** [#53](https://github.com/VizuaaLOG/BulmaJS/issues/53) The tabs plugin now ensures it only grabs the ul/li element that is a direct child of the `tabs-content` element.

# 0.6.0
The reason for this being a large version jump is due to the complete overhaul of the documentation. While this doesn't change the functionality of the code, I feel like this is a large enough change to the project to warrant more than a 'patch' version bump.

+ [#36](https://github.com/VizuaaLOG/BulmaJS/issues/36) The navbar burger button now has the `is-active` class toggled.
+ [#22](https://github.com/VizuaaLOG/BulmaJS/issues/22) Documentation has had a redesign and a complete rewrite. If you find a typo please blame my keyboard ( :) ) and file an issue or submit a pull request.

# 0.5.0
+ [#38](https://github.com/VizuaaLOG/BulmaJS/pull/38) Adjust how plugins are initialised by using classes instead. Data attributes can still be used for customising the plugins behaviour, if supported. (closes [#20](https://github.com/VizuaaLOG/BulmaJS/issues/20))
+ [43b64cd](https://github.com/VizuaaLOG/BulmaJS/commit/43b64cdea58fe6b512ce95c69172889d75b68179) Add a new option to the tabs plugin that allows tabs to be changed when the user hovers over the tab link. On mobile this will revert back to the click/tap handler due to the lack of a hover event being called. (closes [#35](https://github.com/VizuaaLOG/BulmaJS/issues/35))

# 0.4.0
+ [#28](https://github.com/VizuaaLOG/BulmaJS/pull/28) Add the option to disable the modal being closable
+ [#31](https://github.com/VizuaaLOG/BulmaJS/pull/31) Add automated linting to the CI process (closes [#20](https://github.com/VizuaaLOG/BulmaJS/issues/29))

# 0.3.1
+ This changelog was added
+ Fix Wikiki's CSS files not being loaded on the docs
+ Publish to NPM
