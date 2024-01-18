import { fetchHandler, getPostOptions, getPatchOptions } from "../utils";

const baseUrl = '/api/posts';

export const createPost = async ({ user_id, text }) => (
  fetchHandler(baseUrl, getPostOptions({ user_id, text }))
);

export const getAllPosts = async () => {
  const [posts] = await fetchHandler(baseUrl);
  return posts || [];
};

export const getUserPost = async (user_id) => fetchHandler(`${baseUrl}/${user_id}`);