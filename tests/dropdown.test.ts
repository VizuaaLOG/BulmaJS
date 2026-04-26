import { afterEach, describe, expect, it, vi } from 'vitest';
import Bulma from '../src/Core';
import Plugin from '../src/Plugin';
import '../src/plugins/dropdown/Dropdown';

function createDropdownElement(active = false) {
    let root = document.createElement('div');
    root.classList.add('dropdown');

    if (active) {
        root.classList.add('is-active');
    }

    let trigger = document.createElement('button');
    trigger.classList.add('dropdown-trigger');

    let menu = document.createElement('div');
    menu.classList.add('dropdown-menu');

    root.appendChild(trigger);
    root.appendChild(menu);
    document.body.appendChild(root);

    return { root, trigger, menu };
}

afterEach(() => {
    document.body.innerHTML = '';
});

describe('Dropdown', () => {
    it('attaches to the root element and stores the instance', () => {
        let { root, menu } = createDropdownElement();
        let dropdown = Bulma(root).dropdown();

        expect(root.getAttribute('data-bulma-attached')).toBe('attached');
        expect(Bulma(root).data('dropdown')).toBe(dropdown);
        expect(menu.classList.contains('is-hidden')).toBe(true);
    });

    it('initializes menu visibility from the active state', () => {
        let { menu } = createDropdownElement(true);

        Bulma(document.querySelector('.dropdown') as HTMLElement).dropdown();

        expect(menu.classList.contains('is-hidden')).toBe(false);
    });

    it('opens the dropdown once and fires the open event once', () => {
        let { root, menu } = createDropdownElement();
        let dropdown = Bulma(root).dropdown();
        let listener = vi.fn();

        dropdown.on('open', listener);
        dropdown.open();
        dropdown.open();

        expect(root.classList.contains('is-active')).toBe(true);
        expect(menu.classList.contains('is-hidden')).toBe(false);
        expect(listener).toHaveBeenCalledTimes(1);
    });

    it('closes the dropdown once and fires the close event once', () => {
        let { root, menu } = createDropdownElement(true);
        let dropdown = Bulma(root).dropdown();
        let listener = vi.fn();

        dropdown.on('close', listener);
        dropdown.close();
        dropdown.close();

        expect(root.classList.contains('is-active')).toBe(false);
        expect(menu.classList.contains('is-hidden')).toBe(true);
        expect(listener).toHaveBeenCalledTimes(1);
    });

    it('toggles open and closed states', () => {
        let { root } = createDropdownElement();
        let dropdown = Bulma(root).dropdown();

        dropdown.toggle();

        expect(dropdown.isOpen()).toBe(true);
        expect(dropdown.isClosed()).toBe(false);

        dropdown.toggle();

        expect(dropdown.isOpen()).toBe(false);
        expect(dropdown.isClosed()).toBe(true);
    });

    it('returns trigger and menu elements', () => {
        let { root, trigger, menu } = createDropdownElement();
        let dropdown = Bulma(root).dropdown();

        expect(dropdown.getTriggerElement()).toBe(trigger);
        expect(dropdown.getMenuElement()).toBe(menu);
    });

    it('updates and reads closeOthers at runtime', () => {
        let { root } = createDropdownElement();
        let dropdown = Bulma(root).dropdown();

        expect(dropdown.getCloseOthers()).toBe(true);

        dropdown.setCloseOthers(false);

        expect(dropdown.getCloseOthers()).toBe(false);
    });

    it('toggles when the trigger is clicked and stops propagation', () => {
        let { root, trigger } = createDropdownElement();
        let dropdown = Bulma(root).dropdown();
        let bodyListener = vi.fn();

        document.body.addEventListener('click', bodyListener);
        trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(dropdown.isOpen()).toBe(true);
        expect(bodyListener).not.toHaveBeenCalled();
    });

    it('closes other active dropdown instances when closeOthers is enabled', () => {
        let first = createDropdownElement(true);
        let second = createDropdownElement();
        let firstDropdown = Bulma(first.root).dropdown();
        let secondDropdown = Bulma(second.root).dropdown();

        secondDropdown.open();

        expect(firstDropdown.isClosed()).toBe(true);
        expect(first.menu.classList.contains('is-hidden')).toBe(true);
        expect(secondDropdown.isOpen()).toBe(true);
    });

    it('does not close other active dropdowns when closeOthers is disabled', () => {
        let first = createDropdownElement(true);
        let second = createDropdownElement();
        let firstDropdown = Bulma(first.root).dropdown();
        let secondDropdown = Bulma(second.root).dropdown({ closeOthers: false });

        secondDropdown.open();

        expect(firstDropdown.isOpen()).toBe(true);
        expect(secondDropdown.isOpen()).toBe(true);
    });

    it('closes active dropdown elements without stored instances', () => {
        let first = createDropdownElement(true);
        let second = createDropdownElement();
        let secondDropdown = Bulma(second.root).dropdown();

        secondDropdown.open();

        expect(first.root.classList.contains('is-active')).toBe(false);
        expect(first.menu.classList.contains('is-hidden')).toBe(true);
    });

    it('refreshes trigger and menu references after DOM replacement', () => {
        let { root, trigger, menu } = createDropdownElement();
        let dropdown = Bulma(root).dropdown();
        let nextTrigger = document.createElement('button');
        let nextMenu = document.createElement('div');

        nextTrigger.classList.add('dropdown-trigger');
        nextMenu.classList.add('dropdown-menu');
        root.replaceChild(nextTrigger, trigger);
        root.replaceChild(nextMenu, menu);

        dropdown.refresh();
        nextTrigger.click();

        expect(dropdown.getTriggerElement()).toBe(nextTrigger);
        expect(dropdown.getMenuElement()).toBe(nextMenu);
        expect(dropdown.isOpen()).toBe(true);
        expect(nextMenu.classList.contains('is-hidden')).toBe(false);
    });

    it('removes the trigger click listener when destroyed', () => {
        let { root, trigger } = createDropdownElement();
        let dropdown = Bulma(root).dropdown();

        dropdown.destroy();
        trigger.click();

        expect(root.classList.contains('is-active')).toBe(false);
        expect(document.body.contains(root)).toBe(false);
    });
});

describe('Plugin events', () => {
    class TestPlugin extends Plugin {}

    function createPlugin() {
        return new TestPlugin({}, document.createElement('div'));
    }

    it('removes a specific event listener', () => {
        let plugin = createPlugin();
        let removed = vi.fn();
        let remaining = vi.fn();

        plugin.on('event', removed);
        plugin.on('event', remaining);
        plugin.off('event', removed);
        plugin.trigger('event', { value: 'test' });

        expect(removed).not.toHaveBeenCalled();
        expect(remaining).toHaveBeenCalledWith({ value: 'test' });
    });

    it('removes all listeners for an event', () => {
        let plugin = createPlugin();
        let first = vi.fn();
        let second = vi.fn();

        plugin.on('event', first);
        plugin.on('event', second);
        plugin.off('event');
        plugin.trigger('event');

        expect(first).not.toHaveBeenCalled();
        expect(second).not.toHaveBeenCalled();
    });

    it('ignores unknown events when removing listeners', () => {
        let plugin = createPlugin();
        let listener = vi.fn();

        plugin.off('missing', listener);
        plugin.on('event', listener);
        plugin.trigger('event');

        expect(listener).toHaveBeenCalledTimes(1);
    });
});
