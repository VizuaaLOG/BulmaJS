class Data {

    static UID = 1;

    constructor() {
        this._data = {};
    }

    set(uid, key, value) {
        if(!this._data.hasOwnProperty(uid)) {
            this._data[uid] = {};
        }

        this._data[uid][key] = value;
    }

    get(uid, key) {
        if(!this._data.hasOwnProperty(uid)) {
            return undefined;
        }

        return this._data[uid][key];
    }

    destroy(uid) {
        if(this._data.hasOwnProperty(uid)) {
            delete this._data[uid];
        }
    }
}

export default Data;