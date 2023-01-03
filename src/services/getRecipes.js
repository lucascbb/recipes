const getRecipes = async (url) => {
  const response = await fetch(`${url}`);
  const recipes = await response.json();

  return recipes;
};

export default getRecipes;
