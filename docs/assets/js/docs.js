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

if(document.querySelector('#docs-menu')) {
    var vue = new Vue({
        el: '#docs-menu',
        data: {
            items: menuItems,
            selectedVersion: window.location.pathname.match(/\/([0-9.]{3})/)[1]
        },
        methods: {
            changeVersion: function() {
                window.location.href = window.location.href.replace(/\/([0-9.]{3})/, '/' + this.selectedVersion);
            }
        },
        computed: {
            version: function() {
                return window.location.pathname.match(/\/([0-9.]{3})/)[1];
            },

            versions: function() {
                return _.keys(this.items).sort();
            },

            versionItems: function() {
                return this.items[this.version];
            },

            currPath: function() {
                return window.location.pathname;
            }
        }
    });
}

// Add _blank to all external links
var links = document.links;

for (var i = 0, linksLength = links.length; i < linksLength; i++) {
   if (links[i].hostname != window.location.hostname) {
       links[i].target = '_blank';
   } 
}