import React from 'react';
import { connect } from 'react-redux';
import Post from './Post';

const ListBlog = ({ posts }) => (
  <div>
    <div>Danh sách blog: </div>
    {posts && posts.map((post, index) => <Post post={post} key={index.toString()} />)}
  </div>
);

export default connect(state => ({
  posts: state.posts,
}))(ListBlog);
