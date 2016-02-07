import React from "react";

export default class Page extends React.Component {
    static get propTypes() {
        return {
            path: React.PropTypes.string
        };
    }

    render() {
        return (
            <html>
                <head>
                    <title></title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta httpEquiv="Cache-Control" content="no-cache" />
                    <meta httpEquiv="Pragma" content="no-cache" />
                    <meta charSet="utf8" />
                </head>
                <body>
                    <div id="app">
                        { this.props.children }
                    </div>
                    <script type="text/javascript" src="//localhost:8080/dist/client.js"></script>
                </body>
            </html>
        );
    }
};
