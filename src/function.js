export const toSentenceCase = (text) => {
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const searchPokemons = (query, allPokemons) => {
  if (query.length < 3) {
    return "Query harus memiliki minimal 3 karakter.";
  }

  const regex = new RegExp(query);

  // Melakukan pencarian dengan menggunakan regular expression
  const searchResults = allPokemons.filter((pokemon) =>
    regex.test(pokemon.name)
  );

  return searchResults;
};