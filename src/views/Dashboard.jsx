import { useState, useEffect } from 'react';
import { loadUser } from '../utils/auth';
import { Navigate } from 'react-router-dom';
import { useGames } from '../hooks/useGames';
import GameList from '../components/GamesList';
import AddGame from '../components/AddGame';
import GameControls from '../components/GameControls';

export default function Dashboard() {
    const user = loadUser();
    if (!user) return <Navigate to="/" replace />;
    const { games, addGame, deleteGame, updateGame } = useGames();
    const [isOpen, setIsOpen] = useState(false);
    const [filteredGames, setFilteredGames] = useState(games);

    useEffect(() => {
        setFilteredGames(games);
    }, [games]);
    
    const openIt = () => setIsOpen(true);
    const closeIt = () => setIsOpen(false);

    const handleAddGame = (newGame) => {
        addGame(newGame);
    };

/* Search function */
    const handleSearch = (searchTerm) => {
    if (!searchTerm) {
        setFilteredGames(games);
        return;
    }
    const lowerCaseTerm = searchTerm.toLowerCase();
    const filtered = games.filter(
        (game) =>
        (game.boardgame?.toLowerCase() || '').includes(lowerCaseTerm) ||
        (game.description?.toLowerCase() || '').includes(lowerCaseTerm)
    );
    setFilteredGames(filtered);
    };

    /* Filter function */
    const handleFilter = (genre) => {
    if (!genre) {
        setFilteredGames(games);
        return;
    }
    const filtered = games.filter((game) =>
        game.game_info?.categories?.some((cat) =>
        cat.toLowerCase().includes(genre.toLowerCase())
        )
    );
    setFilteredGames(filtered);
    };

  /* Sort function */
  const handleSort = (sortBy) => {
    let sortedGames = [...filteredGames];
    switch (sortBy) {
      case 'title':
        sortedGames.sort((a, b) => (a.boardgame || '').localeCompare(b.boardgame || ''));
        break;
      case 'rating':
        sortedGames.sort((a, b) => (b.game_stats?.average_rating || 0) - (a.game_stats?.average_rating || 0));
        break;
      case 'players':
        sortedGames.sort((a, b) => a.player_counts.min_players - b.player_counts.min_players);
        break;
      case 'complexity':
        sortedGames.sort((a, b) => a.game_stats?.weight - b.game_stats?.weight);
        break;
      default:
        break;
    }
    setFilteredGames(sortedGames);
  };

    return (
        <div className="relative min-h-screen pb-20">
            <div className="p-4">
                <h1 className="text-7xl text-semibold text-center text-primary-red">Game Dashboard</h1>
                <GameControls
                    onSearch={handleSearch}
                    onFilter={handleFilter}
                    onSort={handleSort}
                />
                <GameList games={filteredGames} onDelete={deleteGame} onUpdate={updateGame} />               
            </div>
            <button
                onClick={openIt}
                className="fixed bottom-24 right-16 w-20 h-20 bg-primary-red text-primary-white rounded-full flex items-center justify-center shadow-lg hover:bg-opacity-90 z-40 cursor-pointer"
                aria-label="Add new game"
            >
                <span className="text-7xl font-bold">+</span>
            </button>
            <AddGame
                isOpen={isOpen}
                onClose={closeIt}
                onAddGame={handleAddGame}
            />
        </div>
    );
}