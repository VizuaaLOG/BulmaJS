export default class Plugin {
    constructor(options) {
        this.options = options || {};
    }

    option(key, defaultValue = null) {
        if(!this.options.hasOwnProperty(key) || !this.options[key]) {
            if(typeof defaultValue === "function") {
                return defaultValue();
            }
            
            return defaultValue;
        }

        return this.options[key];
    }
}