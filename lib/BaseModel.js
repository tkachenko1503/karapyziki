'use strict';

let Parse = require('parse/node');
let R = require('ramda');

let _toJSON = R.map((item) => {
    return item.toJSON();
});

class BaseModel extends Parse.Object {
    constructor(name) {
        super(name);
    }

    static toJSON(items) {
        return _toJSON(items);
    }

    static getById(id) {
        let query = new Parse.Query(this);
        return query.get(id);
    }
}

module.exports = BaseModel;
