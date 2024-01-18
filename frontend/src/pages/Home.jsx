import { useContext, useEffect, useState } from "react";
import { getAllPosts } from "../adapters/post-adapter";


export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then(setPosts);
  }, []);

  return (
    <>
      <h1>Home</h1>
      <p>Put something interesting here!</p>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.text}</li>
        ))}
      </ul>
    </>
  );
}
