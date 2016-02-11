const Page = ({ content, data }) => {
    return (`
        <html>
            <head>
                <title>"Hello"</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta httpEquiv="Cache-Control" content="no-cache" />
                <meta httpEquiv="Pragma" content="no-cache" />
                <meta charSet="utf8" />
            </head>
            <body>
                <div id="app">${content}</div>
                <script type="text/javascript">
                    window.__PAGE_STATE__ = ${ JSON.stringify(data) }
                </script>
                <script type="text/javascript" src="//localhost:8080/dist/client.js"></script>
            </body>
        </html>
    `);
};

export default Page;
