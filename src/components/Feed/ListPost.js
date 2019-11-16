import React from 'react';

export default ({ posts }) => (
  <div>
    {posts.map((post, index) => (
      <div className="post-item" key={index.toString()}>
        <p>{post.title}</p>
        <p>ngay ..</p>
        <p>{post.description}</p>
        <p>
          <button type="button">Xem thêm</button>
        </p>
      </div>
    ))}
  </div>
);
