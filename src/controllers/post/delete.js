const { isAuthorized } = require('../../utils/auth-utils');

const deletePost = async (req, res) => {
  const {
    db: { Post },
    body: { id },
    params: { id: postId },
  } = req;

  const posts = await Post.delete();
  res.send(posts);
};

module.exports = deletePost;




