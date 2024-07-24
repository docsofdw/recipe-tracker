// RecipeService.js
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { createRecipe, updateRecipe, deleteRecipe } from './graphql/mutations';
import { listRecipes } from './graphql/queries';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const client = generateClient();

const RecipeService = {
  getRecipes: async () => {
    try {
      const recipeData = await client.graphql({
        query: listRecipes
      });
      return recipeData.data.listRecipes.items;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      return [];
    }
  },

  saveRecipe: async (recipe) => {
    try {
      if (recipe.id) {
        const { id, ...updateRecipeInput } = recipe;
        await client.graphql({
          query: updateRecipe,
          variables: { input: { id, ...updateRecipeInput } }
        });
      } else {
        await client.graphql({
          query: createRecipe,
          variables: { input: recipe }
        });
      }
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  },

  deleteRecipeById: async (id) => {
    try {
      await client.graphql({
        query: deleteRecipe,
        variables: { input: { id } }
      });
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  }
};

export default RecipeService;