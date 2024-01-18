const createPost = async (req, res) => {
  const {
    db: { Post },
    body: { user_id, text, image_url},
  } = req;

  const post = await Post.create(user_id, text, image_url);

  post
    ? res.status(201).send(post)
    : res.status(500).send({ err: "cant create" });
};

module.exports = createPost;
