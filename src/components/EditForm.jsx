import React, { useEffect, useState } from "react";
import useFetch from "../services/useFetch";

function EditForm({ history }) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [remainingItemsList, setRemainingItemsList] = useState([]);
  const { updateDrink, getToken } = useFetch();

  const { getAllById } = useFetch();
  const id = window.location.href.split("edit/")[1];

  useEffect(() => {
    getAllById([{ id }])
    .then((result) => setRecipe(result[0]))
    .then(() => setLoading(false));
  }, []);

  useEffect(() => {
    separateRecipeIntoTwoLists();
  }, [recipe]);

  const handleEditSubmit = async() => {
    let newRecipe = Object.fromEntries(remainingItemsList);
    let onlyIngredients = [];
    ingredientsList.map((item) => onlyIngredients.push(item[1]));
    console.log('onlyIngredients', onlyIngredients);
    newRecipe = { ...newRecipe, ingredients: onlyIngredients };

    const token = getToken()
    await updateDrink(newRecipe, token);
    return history.push(`/details/${id}`)
  };
  
  const separateRecipeIntoTwoLists = () => {
    if (recipe) {
      const ingredients = recipe.ingredients;
      console.log('ing list', recipe.ingredients);
      setIngredientsList(Object.entries(ingredients));
      
      const othenItemsList = Object.entries(recipe);
      setRemainingItemsList(othenItemsList.filter((item) => item[0] !== 'ingredients'));
      return null;
    }
  };
  
  const handleIngredientsChange = (target, type) => {
    if (type === 'ingredient') {
      const newList = ingredientsList.map((item, index) => {
        if (parseInt(target.name) === index) {
          item[1].ingredient = target.value;
          return item;
        }
        return item;
      });
      setIngredientsList(newList);
    }
    if (type === 'measure') {
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
    handleIngredientsChange(target, type)
    if (!type) {
      const newList = remainingItemsList.map((item) => {
        if (item[0] === target.name) item[1] = target.value;
        return item;
      })
      setRemainingItemsList(newList);
    }
  };
  
  if (loading) return <div>Loading the recipe...</div>;
  
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
              onChange={ (e) => handleChange(e.target, 'ingredient')  }
              defaultValue={item.ingredient}
              className="input"
              type="text"
              name={ index }
            />
          </label>
          <label className="label m-2">
            Measure
            <input
              onChange={ (e) => handleChange(e.target, 'measure')  }
              defaultValue={item.measure}
              className="input"
              type="text"
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
