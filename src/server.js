import babelPolyfill from "babel-polyfill";
import koa from "koa";
import logger from "koa-logger";
import Router from "koa-router";
import koaStatic from "koa-static";

import api from "../api";

const app = koa();
const router = new Router();
const port = process.env.PORT || 3000;

app.use(logger());
app.use(catchError);
app.use(koaStatic("static"));

// init routes
router.use("", api.getPagesRoutes());
router.use("/api", api.getApiRoutes());
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
