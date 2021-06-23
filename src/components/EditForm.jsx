import React, { useEffect, useState } from "react";
import useFetch from "../services/useFetch";

function EditForm() {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [remainingItemsList, setRemainingItemsList] = useState([]);
  const { updateDrink } = useFetch();

  const { getAllById } = useFetch();
  const id = window.location.href.split("edit/")[1];

  useEffect(() => {
    getAllById([{ id }])
    .then((result) => setRecipe(result[0]))
    .then(() => separateRecipeIntoTwoLists())
    .then(() => setLoading(false));
  }, []) 

  const handleEditSubmit = async() => {
    let newRecipe = Object.fromEntries(remainingItemsList);
    const newIngredientsList = ingredientsList[0][1];
    newRecipe = { ...newRecipe, ingredients: newIngredientsList };
    await updateDrink(newRecipe);
  };
  if (loading) return <div>Loading the recipe...</div>;

  const separateRecipeIntoTwoLists = () => {
    const recipeList = Object.entries(recipe);
    setIngredientsList(recipeList.filter((item) => item[0].includes('ingredients')));
    setRemainingItemsList(recipeList.filter((item) => item[0] !== 'ingredients'));
    return null;
  };

  const handleChange = (target) => {
    separateRecipeIntoTwoLists();
    if (target.category) {
      const newList = ingredientsList.map((item, index) => {
        if (target.name === index) item.value = target.value;
        return item;
      })
      setIngredientsList(newList);
    }
    if (!target.category) {
      const newList = remainingItemsList.map((item) => {
        if (item[0] === target.name) item[1] = target.value;
        return item;
      })
      setRemainingItemsList(newList);
    }
  };

  return (
    <form>
      <label className="label">
        Name
        <input
          defaultValue={recipe.name}
          onChange={ (e) => handleChange(e.target)  }
          className="input"
          type="text"
          name="name"
        />
      </label>
      <label className="label">
        Instructions
        <input
          onChange={ (e) => handleChange(e.target)  }
          defaultValue={recipe.instructions}
          className="input"
          type="text"
          name="instructions"
        />
      </label>
      <label className="label">
        Category
        <input
          onChange={ (e) => handleChange(e.target)  }
          defaultValue={recipe.category}
          className="input"
          type="text"
          name="category"
        />
      </label>
      <label className="label">
        Image Path
        <input
          onChange={ (e) => handleChange(e.target)  }
          defaultValue={recipe.image}
          className="input"
          type="text"
          name="image"
        />
      </label>
      {recipe.ingredients.map((item, index) => (
        <div key={`${item} ${index}` } className="is-flex">
          <label className="label m-2">
            Ingredient
            <input
              onChange={ (e) => handleChange(e.target)  }
              defaultValue={item.ingredient}
              className="input"
              type="text"
              category="ingredient"
              name={ index }
            />
          </label>
          <label className="label m-2">
            Measure
            <input
              onChange={ (e) => handleChange(e.target)  }
              defaultValue={item.measure}
              className="input"
              type="text"
              category="measure"
              name={ index }
            />
          </label>
        </div>
      ))}
      <button
        type="button"
        onClick={ () => handleEditSubmit() }
      >Submit</button>
    </form>
  );
}

export default EditForm;
