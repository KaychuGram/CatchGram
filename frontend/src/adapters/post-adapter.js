import { fetchHandler, getPostOptions, getPatchOptions, deleteOptions } from "../utils";

const baseUrl = '/api/posts';

export const createPost = async ({ user_id, text, image_url }) => (
  fetchHandler(baseUrl, getPostOptions({ user_id, text, image_url }))
);

export const getAllPosts = async () => {
  const [posts] = await fetchHandler(baseUrl);
  return posts || [];
};

export const getUserPost = async (user_id) => fetchHandler(`${baseUrl}/${user_id}`);

export const deletePost = async (id) => {
  await fetchHandler(`${baseUrl}/${id}`, deleteOptions);
  return true;
};