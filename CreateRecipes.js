import React, { useState, useEffect } from 'react';

function CreateRecipe({ editingRecipe, onSave, onCategorySelect }) {
  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    category: '',
    cookingTime: '',
    servings: '',
    rating: 0,
    image: ''
  });

  useEffect(() => {
    if (editingRecipe) {
      setRecipe(editingRecipe);
    } else {
      setRecipe({
        name: '',
        ingredients: '',
        instructions: '',
        category: '',
        cookingTime: '',
        servings: '',
        rating: 0,
        image: ''
      });
    }
  }, [editingRecipe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      [name]: value
    }));
    if (name === 'category') {
      onCategorySelect(value);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRecipe(prevRecipe => ({
          ...prevRecipe,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(recipe);
    setRecipe({
      name: '',
      ingredients: '',
      instructions: '',
      category: '',
      cookingTime: '',
      servings: '',
      rating: 0,
      image: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="create-recipe-form">
      <h3>{editingRecipe ? 'Edit Recipe' : 'Create New Recipe'}</h3>
      <div className="form-group">
        <label htmlFor="name">Recipe Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={recipe.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          name="category"
          value={recipe.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="dessert">Dessert</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="cookingTime">Cooking Time (minutes):</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          value={recipe.cookingTime}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="servings">Servings:</label>
        <input
          type="number"
          id="servings"
          name="servings"
          value={recipe.servings}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="ingredients">Ingredients:</label>
        <textarea
          id="ingredients"
          name="ingredients"
          value={recipe.ingredients}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="instructions">Instructions:</label>
        <textarea
          id="instructions"
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">Recipe Image:</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>
      {recipe.image && (
        <div className="form-group">
          <img src={recipe.image} alt="Recipe preview" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      )}
      <button type="submit" className="button">
        {editingRecipe ? 'Update Recipe' : 'Add Recipe'}
      </button>
    </form>
  );
}

export default CreateRecipe;