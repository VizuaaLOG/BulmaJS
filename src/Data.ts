class Data {
    static UID = 1;

    _data: { [uid: string]: { [key: string]: any }} = {};

    set(uid: string, key: string, value: any) {
        if(!this._data.hasOwnProperty(uid)) {
            this._data[uid] = {};
        }

        this._data[uid][key] = value;
    }

    get(uid: string, key: string) {
        if(!this._data.hasOwnProperty(uid)) {
            return undefined;
        }

        return this._data[uid][key];
    }

    destroy(uid: string) {
        if(this._data.hasOwnProperty(uid)) {
            delete this._data[uid];
        }
    }
}

export default Data;