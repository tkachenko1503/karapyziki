import React from "react";

export const connectToStore = (Component, store) => {
    return React.createClass({
        contextTypes: {
            pageData: React.PropTypes.object
        },

        getInitialState () {
            return store.getInitialState(this.props, this.state, this.context) || null;
        },

        componentDidMount () {
            this.__unsubscribe = store.listen(this.handleStoresChanged);
        },

        componentWillUnmount () {
            this.__unsubscribe();
        },

        handleStoresChanged (state) {
            if (this.isMounted()) {
                this.setState(state);
            }
        },

        render () {
            return <Component {...this.props} {...this.state} />;
        }
    });
};
