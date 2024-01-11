import { useEffect, useState } from "react";

export default function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadPokemon() {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${currentPage}`
        );
        const data = await response.json();
        setPokemon(data.results);
        setData(data);
        console.log(data.results);
      } catch (error) {
        console.log(error);
      }
    }

    loadPokemon();
  }, [currentPage]);

  function handlePreviousButton() {
    setCurrentPage(currentPage - 20);
  }

  function handleNextButton() {
    setCurrentPage(currentPage + 20);
  }

  return (
    <main>
      {data.previous !== 0 ?? (
        <button type="button" onClick={handlePreviousButton}>
          Previous Page
        </button>
      )}
      <button type="button" onClick={handleNextButton}>
        Next Page
      </button>
      <ul>
        {pokemon.map(({ name }) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </main>
  );
}
