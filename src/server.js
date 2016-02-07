import babelPolyfill from "babel-polyfill";
import koa from "koa";
import logger from "koa-logger";
import Router from "koa-router";
import koaStatic from "koa-static";
import Parse from "parse/node";
import React from "react";
import { renderToString } from "react-dom/server";
import { match, RoutingContext } from "react-router";

import apiRoutes from "../api";
import config from "../config/apiconfig.json";
import routes from "../src/routes";

const app = koa();
let router = new Router();
const port = process.env.PORT || 3000;

Parse.initialize(config.PARSE.APP_ID, config.PARSE.APP_KEY);
console.log("Parse inited");

app.use(logger());
app.use(catchError);
app.use(koaStatic("static"));

// init routes
router.get("/*", pagesHandler);
router.use("/api", apiRoutes);
app.use(router.routes());

// handle app errors
app.on("error", function (err, ctx) {
    console.log("APP_ERROR: ", err.message);
    console.dir(err.stack);
});

// run app
app.listen(port);
console.log("Server running on :", port);


// helpers
function *pagesHandler(next) {
    match({ routes, location: this.request.url }, (error, redirectLocation, renderProps) => {
        if (error) {
            next(error);
        } else if (redirectLocation) {
            this.status = 301;
            this.redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            this.status = 200;
            this.body = "<!DOCTYPE html>" + renderToString(<RoutingContext {...renderProps} />);
        } else {
            this.status = 404;
            this.body = "Not found";
        }
    })
}

function *catchError(next) {
    try {
        yield next;
    } catch (err) {
        this.status = err.status || 500;
        this.type = "json";

        this.body = {
            error: err.message,
            succes: false
        };

        this.app.emit("error", err, this);
    }
}
