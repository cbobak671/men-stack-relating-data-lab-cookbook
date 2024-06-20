const express = require("express");
const router = express.Router();

const User = require("../models/user.js");
const Recipe = require("../models/recipe.js");

router.get("/", async (req, res) => {
  try {
    const userRecipes = await Recipe.find({ owner: req.session.user._id });
    res.render("recipes/index.ejs", {
      recipes: userRecipes,
    });
  } catch (err) {
    console.log(err);
    res.render("recipes/index.ejs");
  }
});

router.get("/new", async (req, res) => {
  res.render("recipes/new.ejs");
});

router.post("/create", async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    newRecipe.owner = req.session.user._id;
    await newRecipe.save();
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/new");
  }
});

router.get("/:recipeId", async (req, res) => {
  try {
    const userRecipe = await Recipe.findById(req.params.recipeId);
    res.render("recipes/show.ejs", { recipe: userRecipe });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/ingredients", async (req, res) => {
  try {
    const currentIngredient = await Ingredient.findById(
      req.params.ingredientId
    );
    res.render("/views/ingredients/show.ejs", { ingredients: ingredient });
  } catch (error) {
    console.log(error);
    res.redirect("/ingredients");
  }
});

router.get("/:recipeId/edit", async (req, res) => {
  try {
    const currentRecipe = await Recipe.findById(req.params.recipeId);
    res.render("recipes/edit.ejs", { recipe: currentRecipe });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.put("/:recipeId", async (req, res) => {
  try {
    const currentRecipe = await Recipe.findByIdAndUpdate(
      req.params.recipeId,
      req.body
    );
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.delete("/:recipeId", async (req, res) => {
  try {
    const currentRecipe = await Recipe.findById(
      req.params.recipeId
    ).deleteOne();
    res.redirect("/recipes");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

module.exports = router;
