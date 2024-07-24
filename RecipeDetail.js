import React, { useState } from 'react';

function RecipeDetail({ recipe, onClose, onSave }) {
  const [rating, setRating] = useState(recipe.rating || 0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    onSave({ ...recipe, rating: newRating });
  };

  return (
    <div className="recipe-detail">
      {recipe.image && (
        <img src={recipe.image} alt={recipe.name} style={{ maxWidth: '100%', height: 'auto', marginBottom: '1rem' }} />
      )}
      <h2>{recipe.name}</h2>
      <p><strong>Category:</strong> {recipe.category}</p>
      <p><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</p>
      <p><strong>Servings:</strong> {recipe.servings}</p>
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleRatingChange(star)}
            style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
          >
            ★
          </span>
        ))}
      </div>
      <h3>Ingredients:</h3>
      <p>{recipe.ingredients}</p>
      <h3>Instructions:</h3>
      <p>{recipe.instructions}</p>
      <button onClick={onClose} className="button">Close</button>
    </div>
  );
}

export default RecipeDetail;