import Headings from './components/Headings';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <>
      <div>
        <Headings heading="Hi, Welcome"> How can we help you today? </Headings>
      </div>
      <div>
        <SearchBar> submit </SearchBar>
      </div>
    </>
  );
}

export default App;
