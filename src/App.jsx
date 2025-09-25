import React, { useState } from 'react';
import MainPage from './MainPage';
import RecipeModal from './RecipeModal';
import './style.css';

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [hasSearched, setHasSearched] = useState(false); // track if user searched

  return (
    <div className="app">
      <h1 className="app-title">Recipe Ideas 🍳</h1>

      {!hasSearched && (
        <div className="landing">
          <p className="landing-text">
            Search for meal ideas based on the ingredients you have at home. 
            Find quick recipes that fit your mood and time!
          </p>
        </div>
      )}

      <MainPage
        onSelectRecipe={setSelectedRecipe}
        onFirstSearch={() => setHasSearched(true)}
      />

      <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
    </div>
  );
}

export default App;
