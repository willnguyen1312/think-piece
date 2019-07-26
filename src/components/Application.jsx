import React, { Component } from "react";

import { firestore } from "../firebase";

import Posts from "./Posts";
import { collectIdsAndDocs } from "../utilities";

class Application extends Component {
  state = {
    posts: []
  };

  componentDidMount = async () => {
    const snapshot = await firestore.collection("posts").get();

    const posts = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      };
    });

    this.setState({
      posts
    });
  };

  handleCreate = async post => {
    const { posts } = this.state;
    const docRef = await firestore.collection("posts").add(post);
    const doc = await docRef.get();

    const newPost = collectIdsAndDocs(doc);

    this.setState({ posts: [newPost, ...posts] });
  };

  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Posts posts={posts} onCreate={this.handleCreate} />
      </main>
    );
  }
}

export default Application;
