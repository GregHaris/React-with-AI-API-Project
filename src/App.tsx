import { useState } from 'react';
import Button from './components/Button';
import Headings from './components/Headings';
import SearchBar from './components/SearchBar';

function App() {
  const [inputValue, setInputValue] = useState(''); // Initialize state with an empty string

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value); // Update state with the new input value
  };

  const handleSubmit = (value: string) => {
    console.log('Input Value:', value);
    // Add your API call or other logic here
  };

  return (
    <>
      <div>
        <Headings>
          <div>
            <h1>Hi, Welcome.</h1>
          </div>
          <div>
            <h3>How can I help you today?</h3>
          </div>
        </Headings>
      </div>
      <div>
        <SearchBar>
          <textarea
            className="search-input"
            placeholder="Enter your text"
            value={inputValue}
            onChange={handleInputChange} // Use the handleInputChange function
          />
          <Button
            textContent="Send"
            handleClick={() => handleSubmit(inputValue)}
          />
        </SearchBar>
      </div>
    </>
  );
}

export default App;
