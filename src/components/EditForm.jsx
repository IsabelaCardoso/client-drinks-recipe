import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import useFetch from "../services/useFetch";

function EditForm({ preloadedValues }) {
  // const preloadedValues = {
  //   firstname: 'Isa',
  //   lastname: 'Cardoso'
  // }

  const ingredientsList = preloadedValues.ingredients;

  const { control, register, handleSubmit } = useForm({
    defaultValues: preloadedValues
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control, 
    name: "ingredients"
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };


  const reg = preloadedValues.ingredients[0].ingredient;
  const registration = {...register(reg)}

  console.log('recipe', preloadedValues.ingredients[0].ingredient);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="label">
        Name
        <input
          className="input"
          {...register('name')}
          type="text"
          name="name"
        />
      </label>
      <label className="label">
        Instructions
        <input
          className="input"
          {...register('instructions')}
          type="text"
          name="instructions"
        />
      </label>
      <label className="label">
        Category
        <input
          className="input"
          {...register('category')}
          type="text"
          name="category"
        />
      </label>
      <label className="label">
        Image Path
        <input
          className="input"
          {...register('image')}
          type="text"
          name="image"
        />
      </label>
      <label className="label">
        Image Path
        <input
          className="input"
          {...register('image')}
          name="image"
          type="text"
        />
      </label>
      {fields.map((field, index) => (
      <input
        key={field.id}
        {...register('field.ingredient')} 
        defaultValue={field.value}
      />
    ))}
      <button>Submit</button>
    </form>
  );
}

export default EditForm;
