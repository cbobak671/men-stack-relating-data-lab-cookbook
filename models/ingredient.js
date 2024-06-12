const mongoose = require('mongoose');
const ingredientSchema = mongoose.Schema({
    name: {type: String, required: true, description: "The name of the ingredient"},
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient; 
