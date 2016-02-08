import Reflux from "reflux";
import superagent from "superagent";

import actions from "../actions/postActions";

const postStore = Reflux.createStore({
    listenables: actions,
    _state: {},

    getInitialState () {
        console.log("Get initial post list");
        return this._state;
    },

    test () {
        console.log('test action fired');
    }
});

export default postStore;
