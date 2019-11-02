QUnit.module('Alert');

let alert;

QUnit.testDone(function() {
    if(!alert) return;
    alert.destroy();
});

QUnit.test('Correct root classes are added', function(assert) {
    alert = Bulma().alert({
        title: 'Test alert'
    });

    assert.ok(document.body.querySelector('.alert'), 'The alert class has been added.');
    assert.ok(document.body.querySelector('.modal'), 'The modal class has been added.');
});

QUnit.test('The header is created if showHeader is true', function(assert) {
    alert = Bulma().alert({
        title: "Hello world"
    });
    
    assert.ok(alert.root.querySelector('.modal-card-head'), 'The header is created');
    assert.ok(alert.root.querySelector('.modal-card-head').innerHTML.indexOf('Hello world') !== -1, 'The header is created');
});

QUnit.test('The header is not created if showHeader is false', function(assert) {
    alert = Bulma().alert({
        title: "Hello world",
        showHeader: false
    });
    
    assert.notOk(alert.root.querySelector('.modal-card-head'), 'The header is created');
});

QUnit.test('The body is created with the supplied text', function(assert) {
    alert = Bulma().alert({
        body: 'Hello world'
    });
    
    assert.ok(alert.root.querySelector('.modal-card-body'), 'The body is created');
    assert.ok(alert.root.querySelector('.modal-card-body').innerHTML.indexOf('Hello world') !== -1, 'The body is created');
});

QUnit.test('The footer is created', function(assert) {
    alert = Bulma().alert({});
    
    assert.ok(alert.root.querySelector('.modal-card-foot'), 'The footer is created');
});

QUnit.test('Confirm button is created', function(assert) {
    alert = Bulma().alert({
        type: 'danger',
        confirm: 'Okay'
    });
    
    assert.ok(alert.root.querySelector('button.is-danger'), 'The confirm button is created');
    assert.ok(alert.root.querySelector('button.is-danger').innerHTML.indexOf('Okay') !== -1);
});

QUnit.test('Cancel button is created when the cancel prop is supplied', function(assert) {
    alert = Bulma().alert({
        type: 'danger',
        cancel: 'Nope'
    });
    
    assert.ok(alert.root.querySelectorAll('button').length === 2, 'The confirm button is created');
    assert.ok(alert.root.innerHTML.indexOf('Nope') !== -1);
});