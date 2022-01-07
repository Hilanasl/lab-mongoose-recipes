const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      "title": "Brownie",
      "level": "Easy Peasy",
      "ingredients": [
        "bitter chocolate",
        "3 eggs",
        "90gr butter",
        "225gr suggar",
        "125gr flour",
        "10gr cocoa powder",
        "75gr nuts",
        "pince of salt",
        "vanilla essence"
      ],
      "cuisine": "American",
      "dishType": "dessert",
      "image": "https://img.taste.com.au/1gQS58Kr/w643-h428-cfill-q90/taste/2016/11/classic-chewy-brownie-102727-1.jpeg",
      "duration": 40,
      "creator": "Chef Joann"
    })
      .then(recipe => console.log(recipe.title))

    Recipe.insertMany(data)
      .then(recipe => {
        recipe.forEach(recipe => console.log(` --> recipe: ${recipe.title}`));
        modifyRecipe();
        deleteRecipe();
      })
      .catch(error => console.error('An error occured while creating a recipe: ', error));
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

// Update the Rigatoni recipe's duratiton
async function modifyRecipe() {
  try {
    const query = { duration: 220 };
    const found = await Recipe.findOneAndUpdate(query, { duration: 100 }, { new: true });
    console.log('Successfuly updated the recipe: ', found.title, '--> New duration: ', found.duration);
  } catch (err) {
    console.error(err);
    process.exit(0);
  }
}

// Delete the carrot cake's recipe
async function deleteRecipe() {
  try {
    const remove = await Recipe.deleteOne({ title: "Carrot Cake" });
    console.log("Recipe successfully deleted")
  } catch (err) {
    console.error(err);
    process.exit(0);
  }
};

