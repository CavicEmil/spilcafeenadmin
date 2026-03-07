import { useState } from 'react';

export default function GameControls({ onSearch, onFilter, onSort }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortBy, setSortBy] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    onFilter(selectedGenre);
  };

  const handleSort = (e) => {
    e.preventDefault();
    onSort(sortBy);
  };


  const genres = [
    'Strategy',
    'Card Game',
    'Fantasy',
    'Family',
    'Economic',
    'Adventure',
    'Party Game',
    'Cooperative',
  ];

  return (
    <div className="bg-primary-white p-4 rounded-lg shadow-sm mb-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1">
          <label className="block text-sm font-medium text-primary-black mb-1">Search</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title or description..."
              className="flex-1 p-2 rounded border border-primary-grey"
            />
            <button
              type="submit"
              className="bg-primary-red text-primary-white px-4 py-2 rounded-full whitespace-nowrap cursor-pointer"
            >
              Search
            </button>
          </div>
        </form>

        {/* Filter by Genre */}
        <form onSubmit={handleFilter} className="flex-1">
          <label className="block text-sm font-medium text-primary-black mb-1">Filter by Genre</label>
          <div className="flex gap-2">
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="flex-1 p-2 rounded border border-primary-grey"
            >
              <option value="">All Genres</option>
              {genres.map((genre, index) => (
                <option key={index} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-primary-red text-primary-white px-4 py-2 rounded-full whitespace-nowrap cursor-pointer"
            >
              Filter
            </button>
          </div>
        </form>

        {/* Sort */}
        <form onSubmit={handleSort} className="flex-1">
          <label className="block text-sm font-medium text-primary-black mb-1">Sort By</label>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 p-2 rounded-full border border-primary-grey"
            >
              <option value="">None</option>
              <option value="title">Title (A-Z)</option>
              <option value="rating">Rating (High to Low)</option>
              <option value="players">Player Count (Low to High)</option>
              <option value="complexity">Complexity (Low to High)</option>
            </select>
            <button
              type="submit"
              className="bg-primary-red text-primary-white px-4 py-2 rounded-full whitespace-nowrap cursor-pointer"
            >
              Sort
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
