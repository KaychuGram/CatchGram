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
      <p>Put something interesting here!</p>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <p>{post.username}</p>
            <p>Created at: {post.created_at}</p>
            {post.image_url && (
              <img
                src={post.image_url}
                alt={`Post Image for ${post.id}`}
                style={{ width: '200px', height: '250px', objectFit: 'cover' }}
              />
            )}
            <p>{post.text}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
