import Bulma, { Core } from '../../Core';
import Plugin from '../../Plugin';
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

        Core.each(elements, (element) => {
            Bulma(element).file();
        });
    }

    constructor(config: FileConfig, root: HTMLElement) {
        super(config, root);

        this.$root.getElement().setAttribute('data-bulma-attached', 'attached');
        this.input = this.$root.getElement().querySelector('input') as HTMLInputElement;
        this.filename = this.$root.getElement().querySelector('.file-name') as HTMLElement;

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

        this.$root.getElement().addEventListener('dragover', (e) => {
            e.preventDefault();
            this.addHoverClass();
        });

        this.$root.getElement().addEventListener('dragleave', (e) => {
            e.preventDefault();
            this.addHoverClass();
        });

        this.$root.getElement().addEventListener('drop', (e) => {
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
        this.$root.getElement().classList.add('is-hovered');
    }
    
    removeHoverClass() {
        this.$root.getElement().classList.remove('is-hovered');
    }
}

Core.registerPlugin('file', File);

export default Bulma;
