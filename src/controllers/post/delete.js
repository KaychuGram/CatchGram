const { isAuthorized } = require('../../utils/auth-utils');

const delete = async (req, res) => {
  const {
    db: { Post },
    body: { id },
    params: { id: postId },
  } = req;

  const posts = await Post.delete();
  res.send(posts);
};

module.exports = delete;




