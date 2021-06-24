import React, { useContext, useEffect, useState } from "react";
import DrinksContext from "../context/Context";
import useFetch from "../services/useFetch";

function RecipeForm({ history }) {
  const { oneRecipe, setNotAuthorizedMessage } = useContext(DrinksContext);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [remainingItemsList, setRemainingItemsList] = useState([]);
  const { updateDrink, getToken, createNewDrink } = useFetch();

  const id = window.location.href.split("edit/")[1];
  const originPath = history.location.pathname;

  const checkTokenForEdit = () => {
    const token = JSON.parse(localStorage.getItem('user'));
    if (!token || !token.token) history.push('/login');
    setNotAuthorizedMessage(true);
    return null;
  }

  useEffect(() => {
    checkTokenForEdit()
    separateRecipeIntoTwoLists();
  }, [oneRecipe]);

  const addNewDrink = async(newRecipe, token) => {
    const newDrink = await createNewDrink(newRecipe, token);
    return history.push(`/details/${newDrink.id}`);
  };

  const drinkUpdate = async(newRecipe, token) => {
    await updateDrink(newRecipe, token);
    return history.push(`/details/${id}`);
  }

  const handleFormSubmit = async () => {
    let newRecipe = Object.fromEntries(remainingItemsList);
    let onlyIngredients = [];

    ingredientsList.map((item) => onlyIngredients.push(item[1]));
    newRecipe = { ...newRecipe, ingredients: onlyIngredients };
    const token = getToken();

    if (originPath === '/create') return addNewDrink(newRecipe, token);
    drinkUpdate(newRecipe, token);
  };

  const separateRecipeIntoTwoLists = () => {
    if (oneRecipe) {
      const ingredients = oneRecipe.ingredients;
      setIngredientsList(Object.entries(ingredients));

      const othenItemsList = Object.entries(oneRecipe);
      setRemainingItemsList(
        othenItemsList.filter((item) => item[0] !== "ingredients")
      );
      return null;
    }
  };

  const handleIngredientsChange = (target, type) => {
    if (type === "ingredient") {
      const newList = ingredientsList.map((item, index) => {
        if (parseInt(target.name) === index) {
          item[1].ingredient = target.value;
          return item;
        }
        return item;
      });
      setIngredientsList(newList);
    }
    if (type === "measure") {
      const newList = ingredientsList.map((item, index) => {
        if (parseInt(target.name) === index) {
          item[1].measure = target.value;
          return item;
        }
        return item;
      });
      setIngredientsList(newList);
    }
  };

  const handleChange = (target, type) => {
    handleIngredientsChange(target, type);
    if (!type) {
      const newList = remainingItemsList.map((item) => {
        if (item[0] === target.name) item[1] = target.value;
        return item;
      });
      setRemainingItemsList(newList);
    }
  };
  return (
    <div>
      <form className="form-div">
        <label className="label">
          Name
          <input
            defaultValue={oneRecipe.name}
            onChange={(e) => handleChange(e.target)}
            className="input"
            type="text"
            name="name"
          />
        </label>
        <label className="label">
          Instructions
          <input
            onChange={(e) => handleChange(e.target)}
            defaultValue={oneRecipe.instructions}
            className="input"
            type="text"
            name="instructions"
          />
        </label>
        <label className="label">
          Category
          <input
            onChange={(e) => handleChange(e.target)}
            defaultValue={oneRecipe.category}
            className="input"
            type="text"
            name="category"
          />
        </label>
        <label className="label">
          Image Path
          <input
            onChange={(e) => handleChange(e.target)}
            defaultValue={oneRecipe.image}
            className="input"
            type="text"
            name="image"
          />
        </label>
        {oneRecipe.ingredients.map((item, index) => (
          <div key={`${item} ${index}`} className="is-flex">
            <label className="label m-2">
              Ingredient
              <input
                onChange={(e) => handleChange(e.target, "ingredient")}
                defaultValue={item.ingredient}
                className="input"
                type="text"
                name={index}
              />
            </label>
            <label className="label m-2">
              Measure
              <input
                onChange={(e) => handleChange(e.target, "measure")}
                defaultValue={item.measure}
                className="input"
                type="text"
                name={index}
              />
            </label>
          </div>
        ))}
      <button
        type="button"
        onClick={() => handleFormSubmit()}
        className="button search-button is-outlined ml-1"
      >
        { originPath === '/create' ? 'Create' : 'Submit' }
      </button>
      </form>
    </div>
  );
}

export default RecipeForm;
