import React, { useState, useEffect } from 'react';

function ReadRecipes({ onEdit, onDelete }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fetch recipes from API or local storage
    const dummyRecipes = [
      { id: 1, name: 'Pasta Carbonara', ingredients: 'Pasta, Eggs, Bacon, Cheese', instructions: 'Cook pasta...', category: 'dinner' },
      { id: 2, name: 'Chicken Stir Fry', ingredients: 'Chicken, Vegetables, Soy Sauce', instructions: 'Stir fry chicken...', category: 'lunch' },
    ];
    setRecipes(dummyRecipes);
  }, []);

  return (
    <div>
      <h3>Recipe List</h3>
      {recipes.map((recipe) => (
        <div key={recipe.id} className="recipe-item">
          <h4>{recipe.name}</h4>
          <p>Category: {recipe.category}</p>
          <p>Ingredients: {recipe.ingredients}</p>
          <div className="recipe-buttons">
            <button className="button button-edit" onClick={() => onEdit(recipe)}>Edit</button>
            <button className="button button-delete" onClick={() => onDelete(recipe.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReadRecipes;