import React, { Component } from "react";

import { firestore } from "../firebase";

import Posts from "./Posts";
import { collectIdsAndDocs } from "../utilities";

class Application extends Component {
  state = {
    posts: []
  };

  unsubscribe = null; // NEW

  componentDidMount = async () => {
    this.unsubscribe = firestore.collection("posts").onSnapshot(snapshot => {
      // NEW
      const posts = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ posts });
    });
  };

  componentWillUnmount = () => {
    // NEW
    this.unsubscribe();
  };

  handleCreate = async post => {
    const docRef = await firestore.collection("posts").add(post);
    // const doc = await docRef.get();

    // const newPost = {
    //   id: doc.id,
    //   ...doc.data(),
    // };

    // const { posts } = this.state;
    // this.setState({ posts: [newPost, ...posts] });
  };

  handleRemove = async id => {
    // const allPosts = this.state.posts;

    try {
      await firestore
        .collection("posts")
        .doc(id)
        .delete();
      // const posts = allPosts.filter(post => id !== post.id);
      // this.setState({ posts });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Posts
          posts={posts}
          onCreate={this.handleCreate}
          onRemove={this.handleRemove}
        />
      </main>
    );
  }
}

export default Application;
