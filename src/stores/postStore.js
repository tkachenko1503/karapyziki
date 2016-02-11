import Reflux from "reflux";
import co from "co";

import { getPostsList } from "../../api/posts";
import actions from "../actions/postActions";

const postStore = Reflux.createStore({
    listenables: actions,
    _state: {
        posts: []
    },

    getInitialState(props, state, context) {
        if (context && context.pageData) {
            this._setPosts(context.pageData.posts);
        }
        return this._state;
    },

    test() {
        console.log('test action fired');
    },

    _setPosts(list) {
        if (!list) {
            return;
        }

        this._state = {
            posts: [
                ...list
            ]
        };
        this.trigger(this._state);
    }
});

export default postStore;
