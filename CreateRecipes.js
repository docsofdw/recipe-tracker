import React, { useState, useEffect } from 'react';

function CreateRecipe({ editingRecipe }) {
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (editingRecipe) {
      setRecipeName(editingRecipe.name);
      setIngredients(editingRecipe.ingredients);
      setInstructions(editingRecipe.instructions);
      setCategory(editingRecipe.category || '');
    }
  }, [editingRecipe]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipe = { name: recipeName, ingredients, instructions, category };
    if (editingRecipe) {
      console.log('Updating recipe:', { ...recipe, id: editingRecipe.id });
    } else {
      console.log('Creating new recipe:', recipe);
    }
    // Reset form
    setRecipeName('');
    setIngredients('');
    setInstructions('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{editingRecipe ? 'Edit Recipe' : 'Create New Recipe'}</h3>
      <div>
        <label htmlFor="recipeName">Recipe Name:</label>
        <input
          type="text"
          id="recipeName"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="dessert">Dessert</option>
        </select>
      </div>
      {/* Other form fields remain the same */}
      <button type="submit" className="button">
        {editingRecipe ? 'Update Recipe' : 'Add Recipe'}
      </button>
    </form>
  );
}

export default CreateRecipe;