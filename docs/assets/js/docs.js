// Sticky navbar
// This adds a slight shadow to the bottom of the navbar
var menu = document.querySelector('#navigation-menu');

document.addEventListener('scroll', function(event) {
    if(event.target.scrollingElement.scrollTop > 1) {
        menu.classList.add('is-scroll');
    } else {
        menu.classList.remove('is-scroll');
    }
});

// Docs side nav
// This generates the side menu and all of the functionality needed
var menuItems = [];

for(var i = 0; i < window.docsMenu.length; i++) {
    menuItems.push({
        title: window.docsMenu[i][0],
        url: window.docsMenu[i][1].replace('.html', ''),
        section: window.docsMenu[i][2],
        version: window.docsMenu[i][3],
        sort: window.docsMenu[i][4],
        page_sort: window.docsMenu[i][5]
    });
}

menuItems = _.sortBy(menuItems, 'sort');
menuItems = _.groupBy(menuItems, 'version');

menuItems = _.transform(menuItems, function(result, value, key) {
    result[key] = _.groupBy(value, 'section');
}, {});

var vue = new Vue({
    el: '#docs-menu',
    data: {
        items: menuItems,
        selectedVersion: window.location.pathname.match(/([0-9.]{3})/gm)[0]
    },
    methods: {
        changeVersion: function() {
            window.location.href = '/docs/' + this.selectedVersion;
        }
    },
    computed: {
        version: function() {
            return window.location.pathname.match(/([0-9.]{3})/gm)[0];
        },

        versions: function() {
            return _.keys(this.items);
        },

        versionItems: function() {
            return this.items[this.version];
        },

        currPath: function() {
            return window.location.pathname;
        }
    }
});

// Add _blank to all external links
var links = document.links;

for (var i = 0, linksLength = links.length; i < linksLength; i++) {
   if (links[i].hostname != window.location.hostname) {
       links[i].target = '_blank';
   } 
}