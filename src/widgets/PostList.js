import React from "react";
import { bind } from "decko";
import { Link } from "react-router";

import postActions from "../actions/postActions";
import postStore from "../stores/postStore";

export default class PostList extends React.Component {
	// @bind
	// handleRoute(e) {
	// 	this.currentUrl = e.url;
	// }

	componentDidMount () {
		postActions.test();
	}

	render () {
		return (
			<div>
				<header>
                    My header WTF
                </header>
				<main>
                    Aloha! My frend WOW
					<Link to="/posts">Test</Link>
                </main>
			</div>
		);
	}
}
