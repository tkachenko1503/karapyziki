import React from "react";
import { bind } from "decko";
import { Link } from "react-router";
import Reflux from "reflux";

import postActions from "../actions/postActions";
import postStore from "../stores/postStore";
import { connectToStore } from "../utils/connectToStore";

class PostList extends React.Component {
	render () {
		return (
			<div>
				<header>
                    My header WTF
                </header>
				<main>
                    Aloha! My frend WOW
					<Link to="/posts">Test</Link>

					<ul>
						{this.props.posts.map( (p, i) => {
							return <li key={i}>{ p.title }</li>;
						})}
					</ul>
                </main>
			</div>
		);
	}
}

export default connectToStore(PostList, postStore);
