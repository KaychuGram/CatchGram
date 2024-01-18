import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { getUser } from "../adapters/user-adapter";
import { logUserOut } from "../adapters/auth-adapter";
import UpdateUsernameForm from "../components/UpdateUsernameForm";
import { createPost, getAllPosts, getUserPost } from "../adapters/post-adapter";

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

  // useEffect(() => {
  //   getAllPosts().then(setPosts);
  // }, []);

  const handleLogout = async () => {
    logUserOut();
    setCurrentUser(null);
    navigate("/");
  };

  if (!userProfile && !errorText) return null;
  if (errorText) return <p>{errorText}</p>;

  // What parts of state would change if we altered our currentUser context?
  // Ideally, this would update if we mutated it
  // But we also have to consider that we may NOT be on the current users page
  const profileUsername = isCurrentUserProfile
    ? currentUser.username
    : userProfile.username;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText("");
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData);
    console.log(formData);
    console.log(values);
    createPost({ user_id: id, text: values.text });
    event.target.reset();
  };

  return (
    <>
      <h1>{profileUsername}</h1>
      {!!isCurrentUserProfile && (
        <button onClick={handleLogout}>Log Out</button>
      )}
      <p>If the user had any data, here it would be</p>
      <p>Fake Bio or something</p>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.text}</li>
        ))}
      </ul>


      <form onSubmit={handleSubmit} aria-labelledby="input-text">
        <h2 id="input-heading">Input text here:</h2>

        <label htmlFor="text">Type here</label>
        <input type="text" autoComplete="text" id="text" name="text" />

        <button>post</button>
      </form>

      {!!isCurrentUserProfile && (
        <UpdateUsernameForm
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      )}
    </>
  );
}
