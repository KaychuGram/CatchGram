const Post = require('../models/post');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async (knex) => {
<<<<<<< HEAD
  // await Post.deleteAll();
  await Post.create('1', 'Bloop bloop');
  await Post.create('1', 'Bloop bloop');
  await Post.create('1', 'Bloop bloop');
=======
  await Post.deleteAll();
  await Post.create(
    "1",
    "Hey! This is the caption",
    "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg"
  );
  await Post.create(
    "1",
    "Another caption",
    "https://www.mytwintiers.com/wp-content/uploads/sites/89/2022/07/Cat.jpg?w=2560&h=1440&crop=1"
  );
  await Post.create(
    "1",
    "Bloop bloop",
    "https://blog.wisconsincheeseman.com/wp-content/uploads/sites/10/2022/10/sharp-cheddar-baby-swiss-1-edited-768x697.jpg.webp"
  );
>>>>>>> 48b6f6119c1bd23a1bdb0817297701f81645eb75

};
