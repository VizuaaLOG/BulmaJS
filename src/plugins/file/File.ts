import Bulma from '../../core';
import Plugin from '../../plugin';
import FileConfig from './FileConfig';

export class File extends Plugin {
    input: HTMLInputElement;
    filename: HTMLElement;

    static parseDocument(context: HTMLElement|Document) {
        let elements;

        if (context.hasOwnProperty('classList') && (context as HTMLElement).classList.contains('dropdown')) {
            elements = [context];
        } else {
            elements = context.querySelectorAll('.file');
        }

        Bulma.each(elements, (element) => {
            Bulma(element).file();
        });
    }

    constructor(config: FileConfig, root: HTMLElement) {
        super(config, root);

        this.$root.setAttribute('data-bulma-attached', 'attached');
        this.input = this.$root.querySelector('input') as HTMLInputElement;
        this.filename = this.$root.querySelector('.file-name') as HTMLElement;

        this.registerEvents();

        Bulma(this.$root).data('file', this);

        this.trigger('init');
    }

    /**
     * Register all the events this module needs.
     * @return {undefined}
     */
    registerEvents() {
        if (this.filename) {
            this.input.addEventListener('change', this.handleTriggerChange.bind(this));
        }

        this.$root.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.addHoverClass();
        });

        this.$root.addEventListener('dragleave', (e) => {
            e.preventDefault();
            this.addHoverClass();
        });

        this.$root.addEventListener('drop', (e) => {
            e.preventDefault();
            this.removeHoverClass();
            this.input.files = e.dataTransfer?.files ?? new FileList();
        });
    }
    
    handleTriggerChange(event) {
        if (event.target.files.length === 0) {
            this.clearFileName();
        }

        if (event.target.files.length === 1) {
            this.setFileName(event.target.files[0].name);
        }

        if (event.target.files.length > 1) {
            this.setFileName(event.target.files.length + ' files');
        }

        this.trigger('changed', event);
    }
    
    clearFileName() {
        this.filename.innerHTML = '';
    }
    
    getFilename() {
        return this.filename.innerHTML;
    }
    
    setFileName(value) {
        this.filename.innerHTML = value;
    }
    
    addHoverClass() {
        this.$root.classList.add('is-hovered');
    }
    
    removeHoverClass() {
        this.$root.classList.remove('is-hovered');
    }
}

Bulma.registerPlugin('file', File);

export default Bulma;
