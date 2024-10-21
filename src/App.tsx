import Headings from './components/Headings';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <>
      <div>
        <Headings>
          <div>
            <h1>Hi, Welcome.</h1>
          </div>
          <div>
            <h3>How can I help you today?</h3>
          </div>{' '}
        </Headings>
      </div>
      <div>
        <SearchBar>
          <textarea placeholder="Enter your text" />
          <button className='submitBtn'> Submit </button>
        </SearchBar>
      </div>
    </>
  );
}

export default App;
