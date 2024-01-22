const Post = require('../models/post');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async (knex) => {
  await Post.deleteAll();
  await Post.create(
    "1",
    "My new kitty needs a friend😔",
    "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg"
  );
  await Post.create(
    "1",
    "Check out my friend's cat, isn't he cute!",
    "https://www.mytwintiers.com/wp-content/uploads/sites/89/2022/07/Cat.jpg?w=2560&h=1440&crop=1"
  );
  await Post.create(
    "3",
    "I love cheese",
    "https://blog.wisconsincheeseman.com/wp-content/uploads/sites/10/2022/10/sharp-cheddar-baby-swiss-1-edited-768x697.jpg.webp"
  );

};
