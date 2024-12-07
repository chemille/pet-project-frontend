
function SearchBar({searchTerm, onSearchChange}) {

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search..." 
        value={searchTerm} 
        onChange={e => onSearchChange(e.target.value)} 
      />
    </div>
  );
}

export default SearchBar;