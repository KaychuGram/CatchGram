/* eslint-disable linebreak-style */
const knex = require("../knex");

class Post {
  // add error handling
  static async list() {
    const query = "SELECT * FROM posts";
    const { rows } = await knex.raw(query);
    return rows || [];
  }

  static async find(id) {
    try {
      const query = "SELECT * FROM posts WHERE user_id = ?";
      const args = [id];
      const { rows } = await knex.raw(query, args);
      const post = rows;
      return post
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async create(user_id, text, image_url) {
    try {
      const query = `INSERT INTO posts (user_id, text, image_url)
      VALUES (?, ?, ?) RETURNING *`;
      const args = [user_id, text, image_url];
      const { rows } = await knex.raw(query, args);
      const post = rows[0];
      return post;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

module.exports = Post;
