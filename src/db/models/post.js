/* eslint-disable linebreak-style */
const knex = require("../knex");

class Post {
  // add error handling
  constructor({ id, user_id, text, image_url, created_at }) {
    this.id = id;
    this.user_id = user_id;
    this.text = text;
    this.image_url = image_url;
    this.created_at = created_at;
  }
  static async list() {
    const query = "SELECT * FROM posts";
    const { rows } = await knex.raw(query);
    return rows || [];
  }

  static async find(user_id) {
    try {
      const query = "SELECT * FROM posts WHERE user_id = ?";
      const args = [user_id];
      const { rows } = await knex.raw(query, args);
      const post = rows;
      return post;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  static async findPost(id) {
    const query = "SELECT * FROM posts WHERE id = ?";
    const args = [id];
    const { rows } = await knex.raw(query, args);
    const post = rows[0];
    return post ? new Post(post) : null;
  }

  static async create(user_id, text = "", image_url) {
    try {
      const query = `INSERT INTO posts (user_id, text, image_url)
      VALUES (?, ?, ?) RETURNING *`;
      const args = [user_id, text, image_url];
      const { rows } = await knex.raw(query, args);
      const post = rows[0];
      return new Post(post);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async deleteAll() {
    return knex.raw("TRUNCATE posts RESTART IDENTITY CASCADE;");
  }

  static async destroy(id) {
    try {
      const query = "DELETE FROM posts WHERE id = ?";
      const args = [id];
      const { rows } = await knex.raw(query, args);
      return rows;

    } catch (error) {
      console.error(error);
      return null;
    }
  };


  updatePost = async (id) => {};
}

module.exports = Post;
