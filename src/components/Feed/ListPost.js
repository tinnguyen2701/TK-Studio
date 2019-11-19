import React from 'react';
import PostItem from './PostItem';

export default ({ posts }) => (
  <div>
    {posts.map((post, index) => (
      <PostItem key={index.toString()} post={post} />
    ))}
  </div>
);
