import React from "react";

export const connectToStore = (Component, store) => {
    return React.createClass({
        getInitialState () {
            return store.getInitialState() || null;
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
