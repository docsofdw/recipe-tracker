import React, { useState } from 'react';
import CreateRecipe from './CreateRecipes';
import ReadRecipes from './ReadRecipes';
import './App.css';

function App() {
  const [editingRecipe, setEditingRecipe] = useState(null);

  const handleEdit = (recipe) => {
    setEditingRecipe(recipe);
    // You might want to scroll to the CreateRecipe form or open a modal here
  };

  const handleDelete = (id) => {
    // Implement delete logic here
    console.log(`Deleting recipe with id: ${id}`);
    // You would typically make an API call here to delete the recipe
    // Then update your local state to remove the recipe
  };

  return (
    <div className="app-container">
      <div className="main-card">
        <h1>Recipe Organizer</h1>
        <div className="section-card">
          <CreateRecipe editingRecipe={editingRecipe} />
        </div>
        <div className="section-card">
          <ReadRecipes onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}

export default App;