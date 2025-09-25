import React, { useState } from 'react';
import RecipeCard from './RecipeCard';

function MainPage({ onSelectRecipe }) {
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!search) return;
    const ingredients = search.split(',').map(i => i.trim());
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients[0]}`);
      const data = await res.json();

      if (data.meals) {
        setRecipes(data.meals);
        setError('');
      } else {
        setRecipes([]);
        setError('No recipes found for these ingredients');
      }
    } catch {
      setError('Error fetching recipes. Please try again.');
    }
  };

  const handleRandom = async () => {
    try {
      const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const data = await res.json();
      if (data.meals) setRecipes(data.meals);
    } catch {
      setError('Error fetching random recipe');
    }
  };

  return (
    <div className="main-page">
      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter ingredients separated by commas (e.g., chicken, tomato, onion)"
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleRandom}>Surprise Me</button>
      </div>

      {/* Error */}
      {error && <p className="error">{error}</p>}

      {/* Recipe list */}
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} onClick={onSelectRecipe} />
        ))}
      </div>
    </div>
  );
}

export default MainPage;
