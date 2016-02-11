import React from "react";
import { renderToString } from "react-dom/server";
import { match, RoutingContext } from "react-router";

import routes from "../routes";
import Page from "../blocks/Page";
import Connect from "./Connect";

export const pageHandler = function *(next) {
    match({ routes, location: this.request.url }, (error, redirectLocation, renderProps) => {
        if (error) {
            next(error);
        } else if (redirectLocation) {
            this.status = 301;
            this.redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            let html = renderToString(
                <Connect pageData={ this.pageData }>
                    <RoutingContext {...renderProps} />
                </Connect>
            );

            this.status = 200;
            this.body = "<!DOCTYPE html>" + Page({
                data: this.pageData,
                content: html
            });
        } else {
            this.status = 404;
            this.body = "Not found";
        }
    });
};
