import Router from "koa-router";
import co from "co";
import Parse from "parseX";

import config from "../config/apiconfig.json";
import { pageHandler } from "../src/utils/commonPage";

import * as posts from "./posts/index.js";
import postsConf from "./posts/config.json";

const GET = "GET";
const routes = parseRoutes(posts, postsConf);

Parse.initialize(config.PARSE.APP_ID, config.PARSE.APP_KEY);
console.log("Parse inited");

export const getApiRoutes = () => {
    let router = new Router();

    for (let {method, path, fn} of routes) {
        router[method.toLowerCase()](path, wrapForKoa(fn));
    }

    return router.routes();
};

export const getPagesRoutes = () => {
    let router = new Router();
    let getRoutes = routes.filter((route) => {
        return route.method === GET;
    });

    for (let {method, path, fn, name} of getRoutes) {
        router[method.toLowerCase()](path, wrapForHTML(fn, name), pageHandler);
    }

    return router.routes();
};

export default { getApiRoutes, getPagesRoutes };


function parseRoutes(apiModule, {routes, name}) {
    let props = Object.keys(routes);

    return props.map(key => {
        let fnName = routes[key];
        let [method, path] = key.split(" ");
        let fn = apiModule[fnName];

        if (!fn) throw new Error("API: exports." + fnName + " is not defined");
        return {
            method,
            path,
            fn,
            name
        };
    });
}

function wrapForKoa(fn) {
    let wrapped = co.wrap(fn);

    return function *() {
        this.body = yield wrapped(this.params, this.query, this);
    };
}

function wrapForHTML(fn, name) {
    let wrapped = co.wrap(fn);

    return function *(next) {
        let data = yield wrapped(this.params, this.query, this);

        this.pageData = {[name]: data};
        yield next;
    };
}
