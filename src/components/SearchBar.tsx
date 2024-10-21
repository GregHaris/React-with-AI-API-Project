interface Props {
  children: string;
}

const SearchBar = ({children}: Props) => {
  return (
    <div className="searchBar">
      <textarea placeholder="Enter your text" />
      <button>  { children } </button>
    </div>
  )
}

export default SearchBar