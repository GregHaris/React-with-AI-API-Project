import { useState, useEffect } from 'react';
import Button from './components/Button';
import Chat from './components/Chat';
import Groq from 'groq-sdk';
import Headings from './components/Headings';
import SearchBar from './components/SearchBar';

const groq = new Groq({
  apiKey: import.meta.env.VITE_REACT_APP_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

interface ChatMessage {
  prompt: string;
  response: string;
}

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>(''); // Initialize state with an empty string
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]); // Initialize chat messages state

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const savedChatMessages = localStorage.getItem('chatMessages');
    if (savedChatMessages) {
      setChatMessages(JSON.parse(savedChatMessages));
    }
  }, []);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value); // Update state with the new input value
  };

  const handleSubmit = async (value: string) => {
    const chatPrompt = `You: ${value}`; // Set the chat prompt
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
      const responseContent =
        chatCompletion.choices[0]?.message?.content || 'No response';
      const newChatMessage: ChatMessage = {
        prompt: chatPrompt,
        response: responseContent,
      };
      setChatMessages([...chatMessages, newChatMessage]); // Append the new chat message to the array
    } catch (error) {
      console.error('Error fetching chat completion:', error);
      const errorMessage = 'Error fetching chat completion';
      const newChatMessage: ChatMessage = {
        prompt: chatPrompt,
        response: errorMessage,
      };
      setChatMessages([...chatMessages, newChatMessage]); // Append the error message to the array
    }
  };

  const handleClearChat = () => {
    setChatMessages([]); // Clear the chat messages state
    localStorage.removeItem('chatMessages'); // Remove chat history from localStorage
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
      <div>
        <Chat>
          {/* Map over the chat messages to render each one */}
          {chatMessages.map((message, index) => (
            <div key={index}>
              <div className="chat-prompt">{message.prompt}</div>
              <div className="chat-response">{message.response}</div>
            </div>
          ))}
          <Button textContent="Clear Chat" handleClick={handleClearChat} />
        </Chat>
      </div>
    </>
  );
};

export default App;
