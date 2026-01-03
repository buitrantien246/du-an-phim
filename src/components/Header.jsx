import { useState } from "react";

export const Header = ({ onSearch }) => {
  const [textSearch, setSearch] = useState("");

  return (
    <header className="bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3">
        
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Left */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold uppercase text-red-600">
              Movie
            </h1>

            {/* Menu mobile */}
            <nav className="flex md:hidden gap-4 text-sm">
              <a className="text-white/70 hover:text-white">Home</a>
              <a className="text-white/70 hover:text-white">About</a>
              <a className="text-white/70 hover:text-white">Contact</a>
            </nav>
          </div>

          {/* Menu desktop */}
          <nav className="hidden md:flex gap-6">
            <a className="text-white/80 hover:text-white">Home</a>
            <a className="text-white/80 hover:text-white">About</a>
            <a className="text-white/80 hover:text-white">Contact</a>
          </nav>

          {/* Search */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search movie..."
              className="
                flex-1 md:w-56
                bg-zinc-900 text-white text-sm
                px-4 py-2 rounded-full
                outline-none
                focus:ring-2 focus:ring-red-600
              "
              value={textSearch}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={() => onSearch(textSearch)}
              className="
                bg-red-600 hover:bg-red-700
                text-white text-sm
                px-4 py-2 rounded-full
              "
            >
              Search
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
