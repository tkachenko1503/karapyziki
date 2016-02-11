import Parse from 'parseX';
import R from 'ramda';

import BaseModel from '../../lib/BaseModel';

let pickAttrs = R.pick(['title', 'description']);

const NAME = 'Post';

class Post extends BaseModel {
    constructor (attrs) {
        super(NAME, attrs);
    }

    setAttrs (attrs) {
        this.set(pickAttrs(attrs));
        this.set('showDate', new Date(attrs.showDate));
        this.set('picture', Post.getFile(attrs.picture));
    }
}

Parse.Object.registerSubclass(NAME, Post);

export default Post;
