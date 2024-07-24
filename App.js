import React, { useState, useEffect } from 'react';
import CreateRecipe from './CreateRecipes';
import ReadRecipes from './ReadRecipes';
import RecipeDetail from './RecipeDetail';
import RecipeService from './RecipeService';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [viewingRecipe, setViewingRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    fetchRecipes();
  }, []);

  async function fetchRecipes() {
    const recipesData = await RecipeService.getRecipes();
    setRecipes(Array.isArray(recipesData) ? recipesData : []);
  }

  const handleSave = async (recipe) => {
    await RecipeService.saveRecipe(recipe);
    fetchRecipes();
    setEditingRecipe(null);
  };

  const handleEdit = (recipe) => {
    setEditingRecipe(recipe);
    setViewingRecipe(null);
  };

  const handleDelete = async (id) => {
    await RecipeService.deleteRecipeById(id);
    fetchRecipes();
    setViewingRecipe(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
  };

  const handleViewRecipe = (recipe) => {
    setViewingRecipe(recipe);
    setEditingRecipe(null);
  };

  const handleCloseRecipeDetail = () => {
    setViewingRecipe(null);
  };

  return (
    <div className="app-container">
      <div className="main-card">
        <h1>Recipe Organizer</h1>
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        {viewingRecipe ? (
          <RecipeDetail recipe={viewingRecipe} onClose={handleCloseRecipeDetail} />
        ) : (
          <>
            <div className="section-card">
              <CreateRecipe 
                editingRecipe={editingRecipe} 
                onSave={handleSave} 
                onCategorySelect={handleCategoryFilter}
              />
            </div>
            <div className="section-card">
              <ReadRecipes 
                recipes={recipes}
                onEdit={handleEdit} 
                onDelete={handleDelete}
                onView={handleViewRecipe}
                searchTerm={searchTerm}
                categoryFilter={categoryFilter}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;