import Button from "@mui/material/Button";

import { useContext, useEffect, useState } from "react";
import { getAllPosts } from "../adapters/post-adapter";


export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then(setPosts);
  }, []);

  // Nested component for Button usage
  function ButtonUsage() {
    return <Button variant="contained">Hello world</Button>;
  }

  return (
    <>
      <h1>Home</h1>
      <p>Put something interesting here!</p>

      {/* Include the ButtonUsage component */}
      <ButtonUsage />

      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.text}</li>
        ))}
      </ul>
    </>
  );
}
