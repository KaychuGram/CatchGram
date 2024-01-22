const destroy = async (req, res) => {
  const {
    db: { Post },
    params: { id },
  } = req;

  const posts = await Post.destroy(id);
  res.send(posts);
};

module.exports = destroy;




