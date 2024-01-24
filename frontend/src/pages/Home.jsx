import React, { useEffect, useState } from "react";
import { getAllPosts } from "../adapters/post-adapter";
import { getUser } from "../adapters/user-adapter";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const allPosts = await getAllPosts();

      // Fetch user information for each post
      const postsWithUsernames = await Promise.all(
        allPosts.map(async (post) => {
          const user = await getUser(post.user_id);
          return { ...post, username: user.username };
        })
      );

      setPosts(postsWithUsernames);
    };

    fetchPosts();
  }, []);

  return (
    <>
      <h1>Home</h1>
      <p>See what your friends have been up to!</p>

      <ul className="post-container">
        {posts.map((post) => (
          <li key={post.id}>
            <h4>User {post.user_id}</h4>
            <p>{post.username}</p>
            {post.image_url && (
              <img
                src={post.image_url}
                alt={`Post Image for ${post.id}`}
                style={{ width: "200px", height: "250px", objectFit: "cover" }}
              />
            )}
            <p>{post.text}</p>
            <p style={{ color: "rgb(46, 41, 44)", fontSize: "13px" }}>
              Created at: {post.created_at.substring(0,10)}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
