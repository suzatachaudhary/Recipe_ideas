import React, { useEffect, useState } from 'react';

function RecipeModal({ recipe, onClose }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (recipe) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.idMeal}`)
        .then((res) => res.json())
        .then((data) => setDetails(data.meals[0]));
    }
  }, [recipe]);

  if (!recipe) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        {details ? (
          <>
            <h2>{details.strMeal}</h2>
            <img src={details.strMealThumb} alt={details.strMeal} />
            <p>{details.strInstructions}</p>
            {details.strYoutube && (
              <a href={details.strYoutube} target="_blank" rel="noreferrer">Watch Video</a>
            )}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default RecipeModal;
