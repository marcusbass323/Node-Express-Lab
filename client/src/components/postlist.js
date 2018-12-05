import React from 'react';
import axios from 'axios';

export default class postlist extends React.Component {

    state = {
        posts: [],
    };

    componentDidMount() {
        axios
            .get(`localhost:8000/posts`)
            .then(res => {
                console.log(res)
                this.setState({ posts: res.data });
            });
    }

    render() {
        return (
            <ul>
                {this.state.posts.map(posts =>
                    <li>posts.id</li>,
                    <li>posts.title</li>,
                    <li>posts.contents</li>,
                    <li>posts.created_at</li>,
                    <li>posts.updated_at</li>
                )}
            </ul>
        )
    }

}