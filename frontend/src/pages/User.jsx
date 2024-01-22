import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { getUser } from "../adapters/user-adapter";
import { logUserOut } from "../adapters/auth-adapter";
import UpdateUsernameForm from "../components/UpdateUsernameForm";
import { createPost, getUserPost } from "../adapters/post-adapter";

export default function UserPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [userProfile, setUserProfile] = useState(null);
  const [errorText, setErrorText] = useState(null);
  const { id } = useParams();
  const isCurrentUserProfile = currentUser && currentUser.id === Number(id);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadUser = async () => {
      const [user, error] = await getUser(id);
      if (error) return setErrorText(error.message);
      setUserProfile(user);
    };
    loadUser();
  }, [id]);

  useEffect(() => {
    const loadPost = async () => {
      const [post, error] = await getUserPost(id);
      if (error) return setErrorText(error.message);
      setPosts(post);
    };
    loadPost();
  }, [id]);

  const handleLogout = async () => {
    logUserOut();
    setCurrentUser(null);
    navigate("/");
  };

  if (!userProfile && !errorText) return null;
  if (errorText) return <p>{errorText}</p>;

  const profileUsername = isCurrentUserProfile
    ? currentUser.username
    : userProfile.username;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText("");
    const formData = new FormData(event.target);
    const val = Object.fromEntries(formData);
    console.log(val);

    const [post, error] = await createPost({
      user_id: id,
      text: val.text,
      image_url: val.url,
    });

    if (error) {
      setErrorText(error.message);
    } else {
      setPosts((prevPosts) => [...prevPosts, post]);
      event.target.reset();
    }
  };
  const handleDelete = async (post) => {
    console.log("I am trying to delete this post", post);

  }

  return (
    <>
      <h1>{profileUsername}</h1>
      {!!isCurrentUserProfile && (
        <button onClick={handleLogout}>Log Out</button>
      )}
      <p>Fake Bio or something</p>

      <ul className="post-container">
        {posts.map((post) => (
          <li key={post.id}>
            <p>{post.username}</p>
            <p>Created at: {post.created_at}</p>
            {post.image_url && (
              <img
                src={post.image_url}
                alt={`Post Image for ${post.id}`}
                style={{ width: "200px", height: "250px", objectFit: "cover" }}
              />
            )}
            <p>{post.text}</p>
            {!!isCurrentUserProfile && (
              <>
                <button onClick={() => console.log("edit post", post)}>Edit</button>
                <button onClick={handleDelete}>
                  Delete
                </button>
              </>
            )}
            
          </li>
        ))}
      </ul>

      

      {!!isCurrentUserProfile && (
        <>
        <form onSubmit={handleSubmit} aria-labelledby="input-text">
        <h2 id="input-heading">Create a new post:</h2>

        <label htmlFor="url">Image URL:</label>
        <input type="url" autoComplete="url" id="url" name="url" required/>

        <label htmlFor="text">Caption:</label>
        <input type="text" autoComplete="text" id="text" name="text" />

        <button>post</button>
      </form>


        <UpdateUsernameForm
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
        </>
      )}
    </>
  );
}

