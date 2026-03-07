import GameTile from './GameTile';

export default function GameList({ games, onDelete, onUpdate }) {
  if (games.length === 0) {
    return <p className="text-primary-grey text-center my-8">NO GAMES ONLY SADNESS</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {games.map((game) => (
        <GameTile
          key={game.id}
          game={game}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}

