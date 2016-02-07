import React from "react";
import { Route } from "react-router";

import Page from "./blocks/Page";
import PostList from "./widgets/PostList";

const routes = (
    <Route component={ Page }>
        <Route path="/" component={ PostList }/>
        <Route path="posts" component={ PostList }/>
    </Route>
);

export default routes;
