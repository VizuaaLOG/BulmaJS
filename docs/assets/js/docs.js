var menu = document.querySelector('#navigation-menu');

document.addEventListener('scroll', function(event) {
    if(event.target.scrollingElement.scrollTop > 1) {
        menu.classList.add('is-scroll');
    } else {
        menu.classList.remove('is-scroll');
    }
});

var menuItems = [];

for(var i = 0; i < window.docsMenu.length; i++) {
    menuItems.push({
        title: window.docsMenu[i][0],
        url: window.docsMenu[i][1],
        section: window.docsMenu[i][2],
        version: window.docsMenu[i][3],
        sort: window.docsMenu[i][4]
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
        items: menuItems
    },
    computed: {
        version: function() {
            return window.defaultVersion;
        },

        versionItems: function() {
            return this.items[this.version];
        },

        currPath: function() {
            return window.location.pathname;
        }
    }
});