import { useState, useEffect } from 'react';
/* import { fetchHotGames } from '../utils/fetchGames'; */
import gamesData from '../data/gamedata.json';

async function loadGames() {
  const games = await loadGamesFromJson();
}

export function useGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* loading games initially */
  useEffect(() => {
    const storedGames = localStorage.getItem('boardGames');
    if (storedGames) {
      setGames(JSON.parse(storedGames));
    } else {
      setGames(gamesData);
      localStorage.setItem('boardGames', JSON.stringify(gamesData));
    }
  }, []);

   /* Add a new game */
  const addGame = (newGame) => {
    const updatedGames = [...games, newGame];
    setGames(updatedGames);
    localStorage.setItem('boardGames', JSON.stringify(updatedGames));
  };

   /* Delete a game by ID */
  const deleteGame = (gameId) => {
    const updatedGames = games.filter(game => game.row_id !== gameId);
    setGames(updatedGames);
    localStorage.setItem('boardGames', JSON.stringify(updatedGames));
  };

  /* Update a game */
  const updateGame = (gameId, updatedGame) => {
    const updatedGames = games.map(game =>
      game.row_id === gameId ? { ...game, ...updatedGame } : game
    );
    setGames(updatedGames);
    localStorage.setItem('boardGames', JSON.stringify(updatedGames));
  };

/*   const fetchGames = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedGames = await loadGames();
      localStorage.setItem('boardGames', JSON.stringify(fetchedGames));
      setGames(fetchedGames);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }; */

    return {
    games,
    loading,
    error,
    addGame,
    deleteGame,
    updateGame,
  };
}