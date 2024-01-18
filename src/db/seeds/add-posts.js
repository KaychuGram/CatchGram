const Post = require('../models/post');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async (knex) => {
  await Post.deleteAll();
  await Post.create('1', 'Bloop bloop');
  await Post.create('1', 'Bloop bloop');
  await Post.create('1', 'Bloop bloop');

};
