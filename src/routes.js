import React from "react";
import { Route, Router } from "react-router";

import PostList from "./widgets/PostList";

const routes = (
    <Router>
        <Route path="/" component={ PostList }/>
        <Route path="posts" component={ PostList }/>
    </Router>
);

export default routes;
