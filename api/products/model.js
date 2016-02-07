import Parse from 'parse/node';
import R from 'ramda';

import BaseModel from '../../lib/BaseModel';

let pickAttrs = R.pick(['title', 'description', 'published']);
let getFile = R.invoker(1, 'fromJSON')(R.__, Parse.File);
let getFiles = R.map(getFile);

const NAME = 'Products';

class Products extends BaseModel {
    constructor(attrs) {
        super(NAME);

        this.fillAttrs(attrs);
    }

    fillAttrs(attrs) {
        if (attrs) {
            this.set(pickAttrs(attrs));
            this.set('img', getFile(attrs.img));
            this.set('gallery', getFiles(attrs.gallery));
        }
    }
}

Parse.Object.registerSubclass(NAME, Products);

export default Products;
