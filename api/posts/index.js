import Parse from 'parseX';
import parseBody from 'co-body';

import Post from './model';

// get single product
export const getPost = function *(params) {
    let id = params.id;
    let post = yield Post.getById(id);

    return post.toJSON();
};

// get list of products
export const getPostsList = function *(params = {}, query = {}) {
    let postQuery = new Parse.Query(Post);
    let limit = query.limit || 20;
    let skip = query.skip || 0;
    let result = yield postQuery
        .limit(limit)
        .skip(skip)
        .find();

    return Post.toJSON(result);
};

// create product
export const newPost = function *(params, query, ctx) {
    let data = yield parseBody.json(ctx);
    let post = new Post(data);
    let result = yield post.save();

    return {
        id: result.id
    };
};

// edit product
export const editPost = function *(params) {
    let id = params.id;
    let post = yield Post.getById(id);
    let data = yield parseBody.json(this);

    post.setAttrs(data);
    yield post.save();

    return {
        succes: true
    };
};

// remove product
export const removePost = function *(params) {
    let id = params.id;
    let post = yield Post.getById(id);

    yield post.destroy();

    return {
        succes: true
    };
};
