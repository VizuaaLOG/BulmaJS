/**
 * File module
 * @module File
 * @since  0.1.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
class File {
    /**
     * Module constructor
     */
    constructor(options) {
        if(!options.element) {
            throw new Error('[BulmaJS] The file component requires an element to function.');
        }

        this.element = options.element;
        this.trigger = this.element.querySelector('input');
        this.target = this.element.querySelector('.file-name');

        this.registerEvents();
    }

    /**
     * Register all the events this module needs.
     */
    registerEvents() {
        this.trigger.addEventListener('change', this.handleTriggerChange.bind(this));
    }

    /**
     * Handle the click event on the trigger.
     * @param  {Object} event
     */
    handleTriggerChange(event) {
        if(event.target.files.length === 0) {
            this.clearFileName();
        }

        if(event.target.files.length === 1) {
            this.setFileName(event.target.files[0].name);
        }

        if(event.target.files.length > 1) {
            this.setFileName(event.target.files.length + ' files');
        }
    }

    clearFileName() {
        this.target.innerHTML = '';
    }

    setFileName(value) {
        this.target.innerHTML = value;
    }

    /**
     * Handle parsing the DOMs data attribute API.
     */
    static handleDomParsing(element) {
        new File({
            element: element
        });
    }
}

export default File;
