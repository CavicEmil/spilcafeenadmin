
import { useState } from 'react';

export default function GameTile({ game, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedGame, setEditedGame] = useState({
    ...game,
    genres: game.game_info?.categories?.join(', ') || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedGame({ ...editedGame, [name]: value });
  };

  const handleSave = () => {
    const updatedGame = {
      ...editedGame,
      game_info: {
        ...game.game_info,
        categories: editedGame.genres.split(',').map(item => item.trim()),
      },
      player_counts: {
        ...game.player_counts,
        min_players: parseInt(editedGame.min_players) || game.player_counts.min_players,
        max_players: parseInt(editedGame.max_players) || game.player_counts.max_players,
      },
      playtime: {
        ...game.playtime,
        min_playtime: parseInt(editedGame.min_playtime) || game.playtime.min_playtime,
        max_playtime: parseInt(editedGame.max_playtime) || game.playtime.max_playtime,
      },
      minimum_age: parseInt(editedGame.minimum_age) || game.minimum_age,
    };
    onUpdate(game.row_id, updatedGame);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedGame({
      ...game,
      genres: game.game_info?.categories?.join(', ') || '',
    });
    setIsEditing(false);
  };


  return (
    <div className="bg-secondary-grey rounded-lg p-4 shadow-sm">
      {isEditing ? (
        <div className="space-y-2">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-primary-black">Title</label>
            <input
              type="text"
              name="boardgame"
              value={editedGame.boardgame}
              onChange={handleChange}
              className="w-full p-2 rounded border border-primary-grey bg-primary-white"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-primary-black">Description</label>
            <textarea
              name="description"
              value={editedGame.description}
              onChange={handleChange}
              className="w-full p-2 rounded border border-primary-grey bg-primary-white"
              rows="2"
            />
          </div>

          {/* Genres (comma-separated) */}
          <div>
            <label className="block text-sm font-medium text-primary-black ">Genres (comma-separated)</label>
            <input
              type="text"
              name="genres"
              value={editedGame.genres}
              onChange={handleChange}
              className="w-full p-2 rounded border bg-primary-white border-primary-grey"
            />
          </div>

          {/* Player Counts */}
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-primary-black">Min Players</label>
              <input
                type="number"
                name="min_players"
                value={editedGame.min_players || game.player_counts.min_players}
                onChange={handleChange}
                className="w-full p-2 rounded bg-primary-white border border-primary-grey"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-primary-black">Max Players</label>
              <input
                type="number"
                name="max_players"
                value={editedGame.max_players || game.player_counts.max_players}
                onChange={handleChange}
                className="w-full p-2 bg-primary-white rounded border border-primary-grey"
              />
            </div>
          </div>

          {/* Playtime */}
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-primary-black">Min Playtime (min)</label>
              <input
                type="number"
                name="min_playtime"
                value={editedGame.min_playtime || game.playtime.min_playtime}
                onChange={handleChange}
                className="w-full p-2 bg-primary-white rounded border border-primary-grey"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-primary-black">Max Playtime (min)</label>
              <input
                type="number"
                name="max_playtime"
                value={editedGame.max_playtime || game.playtime.max_playtime}
                onChange={handleChange}
                className="w-full p-2 bg-primary-white rounded border border-primary-grey"
              />
            </div>
          </div>

          {/* Minimum Age (Family Friendly) */}
          <div>
            <label className="block text-sm font-medium text-primary-black">Family Friendly (Age ≤ 12?)</label>
            <select
              name="minimum_age"
              value={editedGame.minimum_age || game.minimum_age}
              onChange={handleChange}
              className="w-full p-2 bg-primary-white rounded border border-primary-grey"
            >
              <option value="12">Yes (≤ 12)</option>
              <option value="13">No (&gt; 12)</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={handleSave}
              className="bg-primary-red text-primary-white px-3 py-1 rounded-full cursor-pointer"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-primary-red text-primary-white px-3 py-1 rounded-full cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        /* Gamecard View */
        <div className="space-y-2">
          <h3 className="text-subheader font-semibold text-primary-black">{game.boardgame}</h3>
          <p className="text-body text-primary-black">{game.description}</p>
          <div className="flex flex-wrap gap-2">
            {game.game_info?.categories?.map((category, index) => (
              <span
                key={index}
                className="bg-primary-white text-primary-black px-2 py-1 rounded-full text-xs"
              >
                {category}
              </span>
            ))}
          </div>
          <div className="text-sm text-primary-black">
            <p>
              <strong>Players:</strong> {game.player_counts.min_players}-{game.player_counts.max_players}
            </p>
            <p>
              <strong>Duration:</strong> {game.playtime.min_playtime}-{game.playtime.max_playtime} min
            </p>
            <p>
              <strong>Family Friendly:</strong> {game.minimum_age <= 12 ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Complexity:</strong> {game.game_stats?.weight?.toFixed(1) || 'N/A'}
            </p>
            <p>
              <strong>Player Rating:</strong> {Math.floor(game.game_stats.average_rating)}
            </p>
            <p>
              <strong>Year Published:</strong> {game.game_info?.release_year || 'N/A'}
            </p>
          </div>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-primary-red text-primary-white px-3 py-1 rounded-full cursor-pointer"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(game.row_id)}
              className="bg-primary-red text-primary-white px-3 py-1 rounded-full cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
