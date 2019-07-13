QUnit.module('Core');

QUnit.test('A plugin can be registered with core', function(assert) {
    createTestPlugin();

    assert.ok(Bulma.plugins.hasOwnProperty('testplugin'), 'Plugin reference is added to the plugins object.');
    
    assert.ok(Bulma.plugins.testplugin.hasOwnProperty('handler'), 'Plugin reference has a handler property.');
    
    assert.ok(Bulma.plugins.testplugin.hasOwnProperty('priority'), 'Plugin reference has a priority property.');
    assert.ok(Bulma.plugins.testplugin.priority === 1, 'The priority of a plugin is correctly set.');

    assert.ok(Bulma.prototype.hasOwnProperty('testplugin'), 'Plugin reference added to the Bulma class instance.');
});

QUnit.test('That the Bulma document parser correctly initialises a plugin', function(assert) {
    createTestPlugin();

    let elem = document.createElement('div');
    document.body.appendChild(testCreateElem('div', 'testplugin', 'firsttest'));

    Bulma.parseDocument(document.body);
    
    assert.ok(Bulma('.firsttest').data('testplugin'), 'A single instance of testplugin has been created.');
});

QUnit.test('That the Bulma document parser correctly intialises multiple instances of a plugin', function(assert) {
    createTestPlugin();

    document.body.appendChild(testCreateElem('div', 'testplugin', 'secondtest'));

    document.body.appendChild(testCreateElem('div', 'testplugin', 'thirdtest'));

    Bulma.parseDocument(document.body);

    assert.ok(Bulma('.secondtest').data('testplugin'), 'The first div has an instance of test plugin created.');
    assert.ok(Bulma('.thirdtest').data('testplugin'), 'The second div has an instance of test plugin created.');
});

QUnit.test('The createElement method will return the correct element with classes', function(assert) {
    let myElement = Bulma.createElement('div', ['testclass1', 'testclass2']);

    assert.ok(myElement.tagName === 'DIV', 'The method creates the correct type of element.');
    assert.ok(myElement.classList.contains('testclass1'), 'The first class is added to the element.');
    assert.ok(myElement.classList.contains('testclass2'), 'The second class is added to the element.');
});

QUnit.test('The findOrCreateElement method will return an existing element, or create a new one', function(assert) {
    let myElement2 = testCreateElem('div', 'myelement2');
    document.body.appendChild(myElement2);

    let myElement3 = Bulma.findOrCreateElement('.elementmissing', document.body, 'div', ['myelement3']);

    assert.equal(Bulma.findOrCreateElement('.myelement2'), myElement2, 'The existing element is returned without creating a new one');
    assert.ok(myElement3 instanceof HTMLElement, 'The new element is created and returned as it does not exist.');
});

QUnit.test('The stripScripts method will remove any scripts from the string', function(assert) {
    let myString = 'This is a <script>alert("hello world")</script> test';

    assert.equal(Bulma._stripScripts(myString), 'This is a test', 'The script is removed from the string.');
})

QUnit.test('Data can be added and retrieved to/from an element', function(assert) {
    let myElement4 = Bulma('.myelement2');
    myElement4.data('hello', 'world');

    assert.equal(myElement4.data('hello'), 'world', 'The data has been set and matches when retrieved.');
});