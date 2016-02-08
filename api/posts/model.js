import Parse from 'parse/node';
import R from 'ramda';

import BaseModel from '../../lib/BaseModel';

const NAME = 'Post';

class Post extends BaseModel {
    constructor(attrs) {
        super(NAME);
    }
}

Parse.Object.registerSubclass(NAME, Products);

export default Products;
