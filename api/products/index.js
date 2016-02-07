import Parse from 'parse/node';
import parseBody from 'co-body';

import Products from './model';

// get single product
export const getProduct = function *() {
    let id = this.params.id;
    let product = yield Products.getById(id);

    this.body = product.toJSON();
};

// get list of products
export const getProductsList = function *() {
    let query = new Parse.Query(Products);
    let limit = this.query.limit || 20;
    let skip = this.query.skip || 0;
    let result = yield query
        .limit(limit)
        .skip(skip)
        .find();

    this.body = Products.toJSON(result);
};

// create product
export const newProduct = function *() {
    let data = yield parseBody.json(this);
    let product = new Products(data);
    let result = yield product.save();

    this.body = {
        id: result.id
    };
};

// edit product
export const editProduct = function *() {
    let id = this.params.id;
    let product = yield Products.getById(id);
    let data = yield parseBody.json(this);

    product.fillAttrs(data);
    yield product.save();

    this.body = {
        succes: true
    };
};

// remove product
export const removeProduct = function *() {
    let id = this.params.id;
    let product = yield Products.getById(id);

    yield product.destroy();

    this.body = {
        succes: true
    };
};
