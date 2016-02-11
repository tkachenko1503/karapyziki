import React from "react";

export default class Connect extends React.Component {
    static get propTypes() {
        return {
            children: React.PropTypes.element.isRequired,
            pageData: React.PropTypes.object.isRequired
        };
    }

    static get childContextTypes() {
        return {
            pageData: React.PropTypes.object
        };
    }

    getChildContext() {
        return { pageData: this.pageData };
    }

    constructor(props, context) {
        super(props, context);
        this.pageData = props.pageData;
    }

    render() {
        let { children } = this.props;
        return React.Children.only(children);
    }
}
