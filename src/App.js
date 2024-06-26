import logo from './pokeball.svg';
import './App.css';
import { getAllPokemons } from "./api"
import { useEffect, useState } from "react";
import { searchPokemons, toSentenceCase } from './function';
import { Tooltip } from "react-tooltip";

function App() {
  const [pokeList, setPokeList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true);
    getAllPokemons()
      .then((results) => {
        setPokeList(results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const PokemonList = () => {
    return pokeList.map((pokemon, key) => {
      return (
        <div className="card-container" key={key}>
          <div className="card-content">
            <div className="title-container">
              <div className="title">{toSentenceCase(pokemon.name)}</div>
            </div>
            <div className="image-container">
              <img
                src={
                  pokemon &&
                  pokemon.sprites &&
                  pokemon.sprites.other.showdown.front_default != null
                    ? pokemon.sprites.other.showdown.front_default
                    : pokemon && pokemon.sprites
                    ? pokemon.sprites.front_default
                    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png"
                }
                className="pokemon-image"
                alt=""
              />
              <img
                src={
                  pokemon &&
                  pokemon.sprites &&
                  pokemon.sprites.other.showdown.back_default != null
                    ? pokemon.sprites.other.showdown.back_default
                    : pokemon && pokemon.sprites
                    ? pokemon.sprites.back_default
                    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png"
                }
                className="pokemon-image"
                alt=""
              />
            </div>
            <div className="types-section">
              {pokemon.types.map((type, key) => {
                return (
                  <img
                    key={key}
                    src={
                      process.env.PUBLIC_URL +
                      "/images/types/" +
                      type.type.name +
                      ".png"
                    }
                    alt={type.type.name}
                    className="type-image"
                  />
                );
              })}
            </div>
            <div className="base-stats-container">
              <div className="base-stat-item">
                <span className="label">Species</span>
                <span className="text pokemon">{pokemon.species.name}</span>
              </div>
              <div className="v-line"></div>
              <div className="base-stat-item">
                <span className="label">Height</span>
                <span className="text pokemon">{pokemon.height / 10} m</span>
              </div>
              <div className="v-line"></div>
              <div className="base-stat-item">
                <span className="label">Weight</span>
                <span className="text pokemon">{pokemon.weight / 10} kg</span>
              </div>
              <div className="v-line"></div>
              <div className="base-stat-item">
                <span className="label">Base Exp</span>
                <span className="text pokemon">{pokemon.base_experience}</span>
              </div>
            </div>
            <div className="stats-section">
              <div className="stats-wrapper">
                {pokemon.stats.map((stat, index) => {
                  return (
                    <div className="stats-container" key={index}>
                      <span className="label">
                        {toSentenceCase(stat.stat.name.replace("-", " "))}:{" "}
                      </span>
                      <div className="text">
                        <span className="pokemon">{stat.base_stat}</span> pts
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <span className='move-header'>Moves</span>
            <div className="stats-section scrollable">
              {
                pokemon.moves.map((move, index) => {
                  return (
                    <div className="move-container">
                      <span>{move.move.name}</span>
                    </div>
                  );
                })
              }
            </div>
            <div className="abilities-section">
              <div className="section-header">
                <div className="header-title">
                  <span className="title pokemon">Ability</span>
                </div>
                <div className="header-blank"></div>
              </div>
              <div className="section-wrapper">
                {pokemon.abilities.map((ability, index) => {
                  return (
                    <>
                      <div className="ability" key={index}>
                        <div className="ability-text">
                          <span
                            data-tooltip-id="my-tooltip-1"
                            data-tooltip-content={
                              ability.ability.description || "No Description"
                            }
                          >
                            {toSentenceCase(ability.ability.name)}
                          </span>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    })
  }

  return (
    <div className="App">
      <nav className="navbar">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="header">POKE API</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search poke name ..."
            className="search"
            onChange={(e, pokeList) => searchPokemons(e.target.value, pokeList)}
          />
          <button className="search-button">Search</button>
        </div>
      </nav>
      <header className="App-content">
        <div className="card-wrapper">
          {/* {!isLoading ? <div className="loader"></div> : <PokemonList />} */}
          {!isLoading ? (
            <PokemonList pokeList={pokeList} />
          ) : (
            <div className="loader"></div>
          )}
        </div>
      </header>
      <Tooltip id="my-tooltip-1" place="bottom" className="tooltip" />
    </div>
  );
}

export default App;
