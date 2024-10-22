import axios from 'axios';
import Button from './components/Button';
import Chat from './components/Chat';
import Headings from './components/Headings';
import SearchBar from './components/SearchBar';
import { useState } from 'react';

function App() {
  const [inputValue, setInputValue] = useState(''); // Initialize state with an empty string
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [],
  ); // State for conversation history

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value); // Update state with the new input value
  };

  const API_KEY =
    'sk-xk__puyU0pc-MIYVThMZDBgLcFYS4SGpv49h9EqVW5T3BlbkFJ6i3Xm96w_2UZw93nWGvifUCZfPqQ07EO4vifKiDiIA';

  const handleSubmit = async () => {
    try {
      // Make a response to the ChatGPT API with the user input
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          messages: [
            { role: 'system', content: 'You are a helpful assistant' },
            { role: 'user', content: inputValue },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer sk-xk\_\_puyU0pc-MIYVThMZDBgLcFYS4SGpv49h9EqVW5T3BlbkFJ6i3Xm96w_2UZw93nWGvifUCZfPqQ07EO4vifKiDiIA',
          },
        },
      );

      // Update the conversation history with the response from ChatGPT
      setMessages([
        ...messages,
        {
          role: 'assistant',
          content: response.data.choices[0].message.content,
        },
      ]);

      // Clear the input field
      setInputValue('');
    } catch (error) {
      console.error('Error sending message:', error);
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
            handleClick={handleSubmit} // Use the handleSubmit function
          />
        </SearchBar>
      </div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.role}:</strong> {message.content}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
