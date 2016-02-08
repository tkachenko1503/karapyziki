import Parse from 'parse/node';
import parseBody from 'co-body';

import Post from './model';

// get single product
export const getPost = function *() {
    let id = this.params.id;
    let post = yield Post.getById(id);

    this.body = post.toJSON();
};

// get list of products
export const getPostsList = function *() {
    let query = new Parse.Query(Post);
    let limit = this.query.limit || 20;
    let skip = this.query.skip || 0;
    let result = yield query
        .limit(limit)
        .skip(skip)
        .find();

    this.body = Post.toJSON(result);
};

// create product
export const newPost = function *() {
    let data = yield parseBody.json(this);
    let post = new Post(data);
    let result = yield post.save();

    this.body = {
        id: result.id
    };
};

// edit product
export const editPost = function *() {
    let id = this.params.id;
    let post = yield Post.getById(id);
    let data = yield parseBody.json(this);

    yield post.save();

    this.body = {
        succes: true
    };
};

// remove product
export const removePost = function *() {
    let id = this.params.id;
    let post = yield Post.getById(id);

    yield post.destroy();

    this.body = {
        succes: true
    };
};
