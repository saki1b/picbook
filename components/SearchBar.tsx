
import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="max-w-md mx-auto relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search photos by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="block w-full rounded-full border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 placeholder-gray-500 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 sm:text-sm"
      />
    </div>
  );
};
