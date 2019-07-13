function testCreateElem(type, ...classes) {
    let e = document.createElement(type);
    e.classList.add(...classes);
    return e;
}

function createTestPlugin() {
    Bulma.registerPlugin('testplugin', class TestPlugin {
        static create(config) { return 'testplugin'; }

        static parseDocument(context) {
            let elements = context.querySelectorAll('.testplugin');
    
            Bulma.each(elements, (element) => {
                Bulma(element).data('testplugin', new TestPlugin({ element: element }));
            });
        };
    }, 1);
}