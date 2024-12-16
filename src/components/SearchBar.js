
function SearchBar({searchTerm, onSearchChange}) {

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search..." 
        value={searchTerm} 
        onChange={e => onSearchChange(e.target.value)} 
      />
      <button>Search</button>
    </div>
  );
}

export default SearchBar;