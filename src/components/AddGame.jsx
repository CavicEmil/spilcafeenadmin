import { useState } from 'react';

export default function AddGameModal({ isOpen, onClose, onAddGame }) {
  if (!isOpen) return null;

  const [newGame, setNewGame] = useState({
    row_id: Date.now(), // Unique ID
    boardgame: '',
    description: '',
    genres: '',
    min_players: 2,
    max_players: 4,
    min_playtime: 30,
    max_playtime: 60,
    minimum_age: 12,
    game_info: {
      categories: [],
      release_year: new Date().getFullYear(),
    },
    playtime: {},
    player_counts: {},
    ratings: {},
    game_stats: { weight: 2.5 },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewGame({ ...newGame, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const gameToAdd = {
      ...newGame,
      game_info: {
        ...newGame.game_info,
        categories: newGame.genres.split(',').map((item) => item.trim()),
      },
      player_counts: {
        min_players: parseInt(newGame.min_players),
        max_players: parseInt(newGame.max_players),
      },
      playtime: {
        min_playtime: parseInt(newGame.min_playtime),
        max_playtime: parseInt(newGame.max_playtime),
      },
      minimum_age: parseInt(newGame.minimum_age),
    };
    onAddGame(gameToAdd);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-primary-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-header font-semibold text-primary-black mb-4">Add New Game</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary-black mb-1">Title</label>
            <input
              type="text"
              name="boardgame"
              value={newGame.boardgame}
              onChange={handleChange}
              className="w-full p-2 rounded border border-primary-grey"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-black mb-1">Description</label>
            <textarea
              name="description"
              value={newGame.description}
              onChange={handleChange}
              className="w-full p-2 rounded border border-primary-grey"
              rows="3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-black mb-1">Genres (comma-separated)</label>
            <input
              type="text"
              name="genres"
              value={newGame.genres}
              onChange={handleChange}
              className="w-full p-2 rounded border border-primary-grey"
              placeholder="e.g., Strategy, Card Game, Fantasy"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-primary-black mb-1">Min Players</label>
              <input
                type="number"
                name="min_players"
                value={newGame.min_players}
                onChange={handleChange}
                min="1"
                className="w-full p-2 rounded border border-primary-grey"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-primary-black mb-1">Max Players</label>
              <input
                type="number"
                name="max_players"
                value={newGame.max_players}
                onChange={handleChange}
                min="1"
                className="w-full p-2 rounded border border-primary-grey"
                required
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-primary-black mb-1">Min Playtime (min)</label>
              <input
                type="number"
                name="min_playtime"
                value={newGame.min_playtime}
                onChange={handleChange}
                min="5"
                className="w-full p-2 rounded border border-primary-grey"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-primary-black mb-1">Max Playtime (min)</label>
              <input
                type="number"
                name="max_playtime"
                value={newGame.max_playtime}
                onChange={handleChange}
                min="5"
                className="w-full p-2 rounded border border-primary-grey"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-black mb-1">Family Friendly (Age ≤ 12?)</label>
            <select
              name="minimum_age"
              value={newGame.minimum_age}
              onChange={handleChange}
              className="w-full p-2 rounded border border-primary-grey"
            >
              <option value="12">Yes (≤ 12)</option>
              <option value="13">No (&gt; 12)</option>
            </select>
          </div>
          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              className="bg-primary-red text-primary-white px-4 py-2 rounded hover:bg-opacity-90 flex-1"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-primary-grey text-primary-black px-4 py-2 rounded hover:bg-opacity-90 flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
