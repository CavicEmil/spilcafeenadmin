import { loadUser } from '../utils/auth';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useGames } from '../hooks/useGames';

export default function Import() {
  const user = loadUser();
  if (!user) return <Navigate to="/" replace />;
  const { addGame } = useGames();
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = () => {
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedGames = JSON.parse(e.target.result);
        if (!Array.isArray(importedGames)) {
          setMessage('Invalid file format. Expected an array of games.');
          return;
        }

        importedGames.forEach((game) => {
          addGame(game);
        });

        setMessage(`${importedGames.length} games imported successfully!`);
      } catch (error) {
        setMessage('Error parsing the file. Make sure it is valid JSON.');
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col items-center justify-center  p-4">
      <h2 className="text-4xl center font-semibold text-primary-red mb-4 ">Import Games</h2>
      <div className="bg-primary-white p-6 rounded-lg shadow-sm max-w-md ">
        <p className="mb-4 text-primary-black">
          Upload a JSON file containing an array of game objects. Each game should match the structure of your existing game data.
        </p>
        <div className="mb-4">
          <input
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="block w-full text-sm text-primary-grey
              file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0
              file:text-sm file:font-semibold
              file:bg-primary-red file:text-primary-white
              cursor-pointer"
          />
        </div>
        <button
          onClick={handleImport}
          className="bg-primary-red text-primary-white px-4 py-2 rounded-full cursor-pointer"
        >
          Import Games
        </button>
        {message && <p className="mt-4 text-primary-red">{message}</p>}
      </div>
    </div>
  );
}
