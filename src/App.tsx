import React, { useState } from 'react';
import Button from './components/Button';
import Headings from './components/Headings';
import SearchBar from './components/SearchBar';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: import.meta.env.VITE_REACT_APP_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>(''); // Initialize state with an empty string

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value); // Update state with the new input value
  };

  const handleSubmit = async (value: string) => {
    console.log('Input Value:', value);
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: value,
          },
        ],
        model: 'llama3-8b-8192',
      });
      console.log(chatCompletion.choices[0]?.message?.content || 'No response');
    } catch (error) {
      console.error('Error fetching chat completion:', error);
    }
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
};

export default App;
