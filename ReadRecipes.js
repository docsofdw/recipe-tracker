import React from 'react';

function ReadRecipes({ recipes, onEdit, onDelete, onView, searchTerm, categoryFilter }) {
  const filteredRecipes = recipes.filter(recipe => 
    (recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (categoryFilter === '' || recipe.category === categoryFilter)
  );

  return (
    <div>
      <h3>Recipe List</h3>
      {filteredRecipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-item">
            {recipe.image && (
              <img src={recipe.image} alt={recipe.name} style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '1rem', float: 'left' }} />
            )}
            <h4>{recipe.name}</h4>
            <p>Category: {recipe.category}</p>
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
            <p>Servings: {recipe.servings}</p>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{ color: star <= recipe.rating ? 'gold' : 'gray' }}
                >
                  ★
                </span>
              ))}
            </div>
            <div className="recipe-buttons">
              <button className="button" onClick={() => onView(recipe)}>View</button>
              <button className="button button-edit" onClick={() => onEdit(recipe)}>Edit</button>
              <button className="button button-delete" onClick={() => onDelete(recipe.id)}>Delete</button>
            </div>
            <div style={{ clear: 'both' }}></div>
          </div>
        ))
      )}
    </div>
  );
}

export default ReadRecipes;