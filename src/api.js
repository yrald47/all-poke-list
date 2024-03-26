import axios from "axios"

const apiurl = process.env.REACT_APP_APIURL;

export const getAllPokemons = async () => {
  const pokeList = await axios.get(apiurl);
  const pokemonResults = pokeList.data.results;

  const allPromises = pokemonResults.map(async (poke) => {
    const detail = await axios.get(poke.url);

    const abilitiesPromises = detail.data.abilities.map(async (abilityData) => {
      const abilityDetail = await axios.get(abilityData.ability.url);
      return {
        ...abilityData.ability,
        ability: {
          ...abilityData.ability,
          description:
            abilityDetail.data.effect_entries && abilityDetail.data.effect_entries.find((entry) => entry.language.name === "en"
            )?.effect,
        },
      };
    });

    const abilities = await Promise.all(abilitiesPromises);

    return {
      ...detail.data,
      abilities: abilities,
    };
  });

  const combinedData = await Promise.all(allPromises);
  return combinedData;
};
