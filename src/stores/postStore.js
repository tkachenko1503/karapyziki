import Reflux from "reflux";
import superagent from "superagent";

import actions from "../actions/postActions";

const postStore = Reflux.createStore({
    listenables: actions,
    test () {
        console.log('test action fired');
    }
});

export default postStore;
