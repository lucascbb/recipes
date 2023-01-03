const getRecipeForId = async (url, id) => {
  const response = await fetch(`${url}${id}`);
  const recipeId = await response.json();

  return recipeId;
};

export default getRecipeForId;
