const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: { type: String },
  ingredients: { enum: [] },
  cuisine: { type: String, required: true },
  dishType: { type: String },
  image: { type: String },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: Date.today }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;

